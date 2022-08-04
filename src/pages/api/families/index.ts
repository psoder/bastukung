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

    case "POST":
      return handlePost(req, res);

    default:
      return invalidMethod(req, res);
  }
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { Items } = await ddbClient.scan({
    TableName: "Families",
  });

  return res.status(200).json(Items);
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken();

  if (token?.role !== "ADMIN") {
    return res
      .status(401)
      .json({ message: "Du måste vara admin för att skapa familjer." });
  }

  const body = JSON.parse(req.body);
  const name = body.name.trim();

  await ddbClient
    .put({
      TableName: "Families",
      Item: {
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