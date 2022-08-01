import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";

let ddbClient: DynamoDBClient;

const config: DynamoDBClientConfig = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.DB_ACCESS_KEY!,
    secretAccessKey: process.env.DB_ACCESS_SECRET!,
  },
};

if (process.env.NODE_ENV === "production") {
  ddbClient = new DynamoDBClient(config);
} else {
  if (!global.ddbClient) {
    global.ddbClient = new DynamoDBClient({
      ...config,
      endpoint: "http://local-dynamodb:8000",
    });
  }

  ddbClient = global.ddbClient;
}

export default ddbClient;
