import { NextApiRequest, NextApiResponse } from "next";
import { JWT } from "next-auth/jwt";

export const invalidMethod = (req: NextApiRequest, res: NextApiResponse) => {
  return res
    .status(405)
    .json({ message: `'${req.method}' is not allowed for this resource` });
};

export const genericErrorResponse = (response: any, res: NextApiResponse) => {
  const code = response?.$metadata?.httpStatusCode;
  let message = "Någonting gick fel";

  return res.status(code).json({ message: message, details: response });
};
