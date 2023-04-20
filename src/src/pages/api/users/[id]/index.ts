import type { NextApiRequest, NextApiResponse } from "next";
import { invalidMethod } from "src/utils/api-utils";
import { getUser } from "src/utils/db-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return res.status(200).json(await getUser(req.query.id as string));

    default:
      return invalidMethod(req, res);
  }
}
