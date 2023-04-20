import { NextApiRequest, NextApiResponse } from "next";
import { invalidMethod } from "src/utils/api-utils";

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
  return res.status(501);
};
