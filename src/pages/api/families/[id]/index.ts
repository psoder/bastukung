import { ddbClient } from "lib/DynamoDB";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken, JWT } from "next-auth/jwt";
import { UserAction } from "types";
import {
  genericErrorResponse,
  invalidMethod,
  isAllowedToEditFamily,
} from "utils/api-utils";
import { getFamily } from "utils/db-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return res.status(200).json(await getFamily(req.query.id as string));

    case "PUT":
      return handlePut(req, res);

    case "PATCH":
      return handlePatch(req, res);

    default:
      return invalidMethod(req, res);
  }
}

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  const familyId = req.query.id as string;

  if (!isAllowedToEditFamily(token, familyId)) {
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
        familyId: familyId,
        familyName: familyName,
        familyMembers: new Set(["", familyMembers]),
        familyAdmins: new Set(["", familyAdmins]),
      },
    })
    .then(() =>
      res
        .status(201)
        .json({ message: `Familjen "${familyName}" har uppdaterades.` })
    )
    .catch((reason) => {
      genericErrorResponse(reason, res);
    });
};

const handlePatch = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  const familyId = req.query.id as string;
  const family = await getFamily(familyId);
  const { userId, action }: { userId: string; action: UserAction } = JSON.parse(
    req.body
  );

  if (!isAllowedToEditFamily(token, familyId)) {
    return res.status(401).json({
      message:
        "Du måste vara admin eller familjeadmin för att redigera familjer.",
    });
  }

  if (!family?.familyMembers?.includes(userId) && action !== "remove") {
    return res.status(409).json({
      message: "Användaren är inte en medlem i familjen.",
    });
  }

  let updateExpression = "";

  switch (action) {
    case "promote":
      updateExpression = `ADD familyAdmins :u`;
      break;

    case "demote":
      updateExpression = `DELETE familyAdmins :u`;
      break;

    case "remove":
      updateExpression = `DELETE familyAdmins :u, familyMembers :u`;
      break;
  }

  return await ddbClient
    .update({
      TableName: "Families",
      Key: {
        familyId: familyId,
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: {
        ":u": new Set([userId]),
      },
    })
    .then(() => res.status(200).json({ message: "Familjen har uppdaterats." }))
    .catch((reason) => genericErrorResponse(reason, res));
};
