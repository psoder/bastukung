import { PutCommandInput, PutCommandOutput } from "@aws-sdk/lib-dynamodb";
import { ddbClient } from "lib/DynamoDB";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { ApiResponse } from "types";
import { invalidMethod } from "src/utils/api-utils";
import { getBookings, getUser } from "src/utils/db-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return res.status(501).json(await getBookings());

    case "POST":
      return handlePost(req, res);

    default:
      return invalidMethod(req, res);
  }
}

const handlePost = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  const token = await getToken({ req });

  if (!token) {
    return res
      .status(401)
      .json({ message: "Du måste vara inloggad för att göra bokningar." });
  }

  let startTime: Date | undefined;
  let endTime: Date | undefined;
  let comment: string | undefined;

  try {
    const body = JSON.parse(req.body);
    startTime = new Date(body.startTime);
    endTime = new Date(body.endTime);
    comment = body.comment;
    console.log("startTime", new Date(startTime), startTime.getTime());
    console.log("endTime", new Date(endTime), endTime.getTime());
  } catch (error) {
    return res.status(400).json({ message: "Felaktigt syntax." });
  }

  if (endTime.getTime() - startTime.getTime() !== 1000 * 60 * 60 * 3) {
    return res.status(400).json({ message: "Bokningen är inte tre timmar." });
  }

  if (startTime.getTime() < new Date().getTime()) {
    return res
      .status(400)
      .json({ message: "Kan inte boka en tid i forntiden." });
  }

  const familyId = (await getUser(token.sub as string))?.familyId;

  const { Items } = await ddbClient.scan({
    TableName: "Bookings",
    FilterExpression: "startTime = :t",
    ExpressionAttributeValues: {
      ":t": startTime.getTime(),
    },
  });

  if (Items?.length ?? 0 > 0) {
    return res
      .status(409)
      .json({ message: "Det finns redan en bokning på den valda tiden." });
  }

  const params: PutCommandInput = {
    TableName: "Bookings",
    Item: {
      familyId: familyId,
      startTime: startTime.getTime(),
      endTime: endTime.getTime(),
      bookedBy: token.sub,
      comment: comment,
    },
  };

  const onSuccess = (value: PutCommandOutput) => {
    return res.status(201).json({
      message: `Bokningen har gjorts.`,
      details: value,
    });
  };

  const onReject = (reason: any) => {
    return res.status(500).json({
      message: "Någonting gick fel. Ingen bokning har gjorts.",
      details: reason,
    });
  };

  const onError = (reason: any) => {
    return res
      .status(500)
      .json({ message: "Någonting gick fel.", details: reason });
  };

  return await ddbClient.put(params).then(onSuccess, onReject).catch(onError);
};
