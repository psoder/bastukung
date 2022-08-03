import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import * as OneTable from "dynamodb-onetable/Dynamo";

let Dynamo: OneTable.Dynamo;

// if (process.env.NODE_ENV === "production") {
//   Dynamo = new OneTable.Dynamo({
//     client: new DynamoDBClient({
//       region: process.env.AWS_REGION,
//     }),
//   });
// } else {
//   if (!global.dynamoOT) {
//     global.dynamoOT = new OneTable.Dynamo({
//       client: new DynamoDBClient({
//         region: process.env.AWS_REGION,
//       }),
//     });
//   }
//   Dynamo = global.dynamoOT;
// }

export { Dynamo };
