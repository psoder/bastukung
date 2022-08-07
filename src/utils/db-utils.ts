import { ddbClient } from "lib/DynamoDB";
import { Booking, Family, User } from "types";

export const getFamily = async (familyId: string): Promise<Family | null> => {
  const { Item } = await ddbClient.get({
    TableName: "Families",
    Key: {
      familyId: `${familyId}`,
    },
  });

  if (!Item) {
    return null;
  }

  const family = {
    ...Item,
    familyMembers: Array.from(new Set(Item?.familyMembers)),
    familyAdmins: Array.from(new Set(Item?.familyAdmins)),
  };

  return family as Family;
};

export const getFamilies = async () => {
  const { Items } = await ddbClient.scan({
    TableName: "Families",
  });

  const families = Items?.map((item) => {
    return {
      ...item,
      familyMembers: Array.from(new Set(item.familyMembers)),
      familyAdmins: Array.from(new Set(item.familyAdmins)),
    };
  }) as Family[];

  return families;
};

export const getUsers = async () => {
  const { Items } = await ddbClient.scan({
    TableName: "Users",
    ExpressionAttributeNames: {
      "#t": "type",
      "#n": "name",
      "#r": "role",
    },
    ExpressionAttributeValues: {
      ":t": "USER",
    },
    FilterExpression: "#t = :t",
    ProjectionExpression: "id, #n, email, image, #r, familyId, familyAdmin",
  });
  return Items as User[];
};

export const getUser = async (userId: string): Promise<User | null> => {
  const { Item } = await ddbClient.get({
    TableName: "Users",
    Key: {
      pk: `USER#${userId}`,
      sk: `USER#${userId}`,
    },
    ProjectionExpression: "id, #n, email, image, #r, familyId, familyAdmin",
    ExpressionAttributeNames: {
      "#n": "name",
      "#r": "role",
    },
  });

  if (!Item) {
    return null;
  }

  return Item as User;
};

export const getBookings = async () => {
  const { Items } = await ddbClient.scan({
    TableName: "Bookings",
  });

  return Items as Booking[];
};
