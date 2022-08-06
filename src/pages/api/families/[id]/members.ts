import { ddbClient } from "lib/DynamoDB";
import type { NextApiRequest, NextApiResponse } from "next";
import { invalidMethod } from "utils/api-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return handleGet(req, res);

    default:
      return invalidMethod(req, res);
  }
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const family = await ddbClient
    .get({
      TableName: "Families",
      Key: {
        familyId: `${req.query.id}`,
      },
      ProjectionExpression: "familyMembers, familyAdmins",
    })
    .then((res) => {
      return res.Item;
    });

  await ddbClient
    .executeStatement({
      Statement: `
        SELECT id, name, email, image, role
        FROM "Users" 
        WHERE id IN [${family?.familyMembers.map((id: string) => `'${id}'`)}]`,
    })
    .then((response) => {
      res.status(200).json(
        response.Items?.map((member) => {
          return {
            ...member,
            familyAdmin: family?.familyAdmins.includes(member.id),
          };
        })
      );
    })
    .catch((reason) => {
      const code = reason?.$metadata?.httpStatusCode;
      let message = "Någonting gick fel";

      return res.status(code).json({ message: message, details: reason });
    });
};
