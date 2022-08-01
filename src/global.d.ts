import DynamoDBClient from "@aws-sdk/client-dynamodb";
import Dynamo from "dynamodb-onetable/Dynamo";

declare global {
  var ddbClient: DynamoDBClient;
  var dynamo: Dynamo;
}
