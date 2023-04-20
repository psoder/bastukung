import { UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
import { ddbClient } from "lib/DynamoDB";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { UserAction } from "types";
import { genericErrorResponse, invalidMethod } from "src/utils/api-utils";
import { getFamily, getUser } from "src/utils/db-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return res.status(200).json(await getFamily(req.query.id as string));

    case "PATCH":
      return handlePatch(req, res);

    default:
      return invalidMethod(req, res);
  }
}

const handlePatch = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  const familyId = req.query.id as string;
  const family = await getFamily(familyId);
  const { userId, action }: { userId: string; action: UserAction } = JSON.parse(
    req.body
  );
  const user = await getUser(userId);

  if (
    !(
      token?.role === "ADMIN" ||
      (user?.familyAdmin && user.familyId === familyId)
    )
  ) {
    return res.status(403).json({
      message:
        "Du måste vara admin eller familjeadmin för att redigera familjer.",
    });
  }

  if (
    !family?.familyMembers?.includes(userId) &&
    (action == "promote" || action == "demote")
  ) {
    return res.status(409).json({
      message: "Användaren är inte en medlem i familjen.",
    });
  }

  if (user?.familyId && (action == "add" || action == "addAdmin")) {
    return res.status(409).json({
      message: "Användaren är redan med i en familj.",
    });
  }

  const params: UpdateCommandInput = {
    TableName: "Families",
    Key: {
      familyId: familyId,
    },
    ExpressionAttributeValues: {
      ":u": new Set([userId]),
    },
  };

  switch (action) {
    case "add":
      params.UpdateExpression = `ADD familyMembers :u`;
      break;

    case "addAdmin":
      params.UpdateExpression = `ADD familyMembers :u, familyAdmins :u`;
      break;

    case "promote":
      params.UpdateExpression = `ADD familyAdmins :u`;
      break;

    case "demote":
      params.UpdateExpression = `DELETE familyAdmins :u`;
      break;

    case "remove":
      params.UpdateExpression = `DELETE familyAdmins :u, familyMembers :u`;
      break;

    default:
      return res.status(405).json({ message: "Otillåten handling." });
  }

  return await ddbClient
    .update(params)
    .then((uco) => {
      if (!["add", "addAdmin", "remove", "demote"].includes(action)) {
        return uco;
      }

      const params: UpdateCommandInput = {
        TableName: "Users",
        Key: {
          pk: `USER#${userId}`,
          sk: `USER#${userId}`,
        },
      };

      switch (action) {
        case "add":
          params.UpdateExpression = "SET familyId = :fid, familyAdmin = :f";
          params.ExpressionAttributeValues = {
            ":fid": familyId,
            ":f": false,
          };
          break;

        case "addAdmin":
          params.UpdateExpression = "SET familyId = :fid, familyAdmin = :t";
          params.ExpressionAttributeValues = {
            ":fid": familyId,
            ":t": true,
          };
          break;

        case "remove":
          params.UpdateExpression = "REMOVE familyId, familyAdmin";
          break;

        case "demote":
          params.UpdateExpression = "SET familyAdmin = :f";
          params.ExpressionAttributeValues = {
            ":f": false,
          };
          break;
      }

      return ddbClient.update(params);
    })
    .then(() => res.status(200).json({ message: "Familjen har uppdaterats." }))
    .catch((reason) => genericErrorResponse(reason, res));
};
