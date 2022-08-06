import { ddbClient } from "lib/DynamoDB";
import type { NextApiRequest, NextApiResponse } from "next";
import { invalidMethod } from "utils/api-utils";
import { getFamily } from "utils/db-utils";

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
  const family = await getFamily(req.query.id as string);

  if (!family.familyMembers || family.familyMembers?.length == 0) {
    return res.status(200).json({ members: [] });
  }

  await ddbClient
    .executeStatement({
      Statement: `
        SELECT id, name, email, image, role
        FROM "Users" 
        WHERE id IN [${family?.familyMembers.map((id) => `'${id}'`)}]`,
    })
    .then((response) => {
      return res.status(200).json({
        members: response.Items?.map((member) => {
          return {
            ...member,
            familyAdmin: family?.familyAdmins?.includes(member.id) ?? [],
          };
        }),
      });
    })
    .catch((reason) => {
      const code = reason?.$metadata?.httpStatusCode;
      let message = "Någonting gick fel";

      return res.status(code).json({ message: message, details: reason });
    });
};
