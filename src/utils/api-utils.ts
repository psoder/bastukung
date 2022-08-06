import { NextApiRequest, NextApiResponse } from "next";

export const invalidMethod = (req: NextApiRequest, res: NextApiResponse) => {
  return res
    .status(405)
    .json({ message: `'${req.method}' is not allowed for this resource` });
};
