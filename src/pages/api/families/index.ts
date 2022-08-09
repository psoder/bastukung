import { ddbClient } from "lib/DynamoDB";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import crypto from "node:crypto";
import { invalidMethod } from "utils/api-utils";
import { getFamilies } from "utils/db-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return res.status(200).json(await getFamilies());

    case "POST":
      return handlePost(req, res);

    default:
      return invalidMethod(req, res);
  }
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });

  if (token?.role !== "ADMIN") {
    return res
      .status(403)
      .json({ message: "Du måste vara admin för att skapa familjer." });
  }

  const body = JSON.parse(req.body);
  const name = body.name.trim();

  await ddbClient
    .put({
      TableName: "Families",
      Item: {
        familyId: crypto.createHash("md5").update(name).digest("hex"),
        familyName: name,
      },
      ConditionExpression: `attribute_not_exists(familyName)`,
    })
    .then(() =>
      res.status(201).json({ message: `Familj med namnet "${name}" skapades.` })
    )
    .catch((response) => {
      const code = response?.$metadata?.httpStatusCode;
      let message = "Någonting gick fel";

      if (code === 400) {
        message = `En familj med namnet "${name}" existerar redan.`;
      }

      return res.status(code).json({ message: message });
    });
};
