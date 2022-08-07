import type { NextApiRequest, NextApiResponse } from "next";
import { invalidMethod } from "utils/api-utils";
import { getUsers } from "utils/db-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return res.status(200).json(await getUsers());

    default:
      return invalidMethod(req, res);
  }
}
