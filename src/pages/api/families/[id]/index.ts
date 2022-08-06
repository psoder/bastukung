import { ddbClient } from "lib/DynamoDB";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { invalidMethod } from "utils/api-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return handleGet(req, res);

    case "PUT":
      return handlePut(req, res);

    default:
      return invalidMethod(req, res);
  }
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { Item } = await ddbClient.get({
    TableName: "Families",
    Key: {
      familyId: req.query.id,
    },
  });

  return res.status(200).json(Item);
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  const { id } = req.query;

  if (
    !(token?.role === "ADMIN" || (token?.familyAdmin && token.familyId === id))
  ) {
    return res.status(401).json({
      message:
        "Du måste vara admin eller familjeadmin för att redigera familjer.",
    });
  }

  const body = JSON.parse(req.body);
  const familyName: string = body.familyName;
  let familyAdmins = Array.from<string>(
    new Set(
      body.familyAdmins.filter((admin: string) => {
        return admin?.length > 0;
      })
    )
  );
  let familyMembers = Array.from<string>(
    new Set(
      body.familyMembers.filter((member: string) => {
        return member?.length > 0;
      })
    )
  );

  familyAdmins?.forEach((adminId: string) => {
    if (!familyMembers.includes(adminId)) {
      familyMembers.push(adminId);
    }
  });

  await ddbClient
    .put({
      TableName: "Families",
      Item: {
        familyId: id,
        familyName: familyName,
        familyMembers: familyMembers,
        familyAdmins: familyAdmins,
      },
    })
    .then(() =>
      res
        .status(201)
        .json({ message: `Familjen "${familyName}" har uppdaterades.` })
    )
    .catch((response) => {
      const code = response?.$metadata?.httpStatusCode;
      let message = "Någonting gick fel";

      return res.status(code).json({ message: message });
    });
};
