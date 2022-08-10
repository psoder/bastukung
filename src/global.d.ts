import DynamoDBClient, { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import Dynamo from "dynamodb-onetable/Dynamo";

declare global {
  var ddbClient: DynamoDBDocument;
}
