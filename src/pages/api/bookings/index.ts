import { NextApiRequest, NextApiResponse } from "next";
import { invalidMethod } from "utils/api-utils";
import { getBookings } from "utils/db-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return res.status(501).json(await getBookings());

    case "POST":
      return handlePost;

    default:
      return invalidMethod(req, res);
  }
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(501);
};
