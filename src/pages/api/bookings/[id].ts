import { NextApiRequest, NextApiResponse } from "next";
import { invalidMethod } from "utils/api-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return handleGet(req, res);

    case "PATCH":
      return handlePatch(req, res);

    case "DELETE":
      return handleDelete(req, res);

    default:
      return invalidMethod(req, res);
  }
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(501);
};

const handlePatch = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(501);
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(501);
};
