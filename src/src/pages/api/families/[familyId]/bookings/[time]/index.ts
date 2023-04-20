import { NextApiRequest, NextApiResponse } from "next";
import { genericErrorResponse, invalidMethod } from "src/utils/api-utils";
import { ddbClient } from "lib/DynamoDB";
import { DeleteCommandOutput } from "@aws-sdk/lib-dynamodb";
import { getToken } from "next-auth/jwt";
import { getBooking, getUser } from "src/utils/db-utils";

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
  const familyId = req.query.familyId;
  const startTime = +(req.query.time as string);
  const token = await getToken({ req });
  const booking = await getBooking(familyId as string, startTime);

  if (!booking) {
    return res.status(409).json({ message: "Det finns ingen sådan bokning." });
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Du måste vara inloggad för att ta bort en bokning." });
  }

  const user = await getUser(token?.sub!);

  if (
    !(
      user?.role == "ADMIN" ||
      (user?.familyId == familyId && user?.familyAdmin) ||
      user?.id == booking.bookedBy
    )
  ) {
    return res
      .status(403)
      .json({ message: "Du har inte rättigheten att ta bort en bokning." });
  }

  const onFulfilled = (value: DeleteCommandOutput) => {
    console.log("fjksdlajfk;l");
    return res
      .status(200)
      .json({ message: "Bokning har tagits bortt.", details: value });
  };

  const onReject = (reason: any) => {
    return genericErrorResponse(reason, res);
  };

  return await ddbClient
    .delete({
      TableName: "Bookings",
      Key: { familyId: familyId, startTime: startTime },
    })
    .then(onFulfilled, onReject);
};
