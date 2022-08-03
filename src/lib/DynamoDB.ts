import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

let ddbClient: DynamoDBDocument;

const config: DynamoDBClientConfig = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.DB_ACCESS_KEY!,
    secretAccessKey: process.env.DB_ACCESS_SECRET!,
  },
};

const marshallOptions = {
  convertEmptyValues: true,
  removeUndefinedValues: true,
  convertClassInstanceToMap: true,
};

// Create DynamoDBDocumentClient
if (process.env.NODE_ENV === "production") {
  ddbClient = DynamoDBDocument.from(new DynamoDBClient(config), {
    marshallOptions,
  });
} else {
  if (!global.ddbClient) {
    global.ddbClient = DynamoDBDocument.from(
      new DynamoDBClient({ ...config, endpoint: "http://local-dynamodb:8000" }),
      {
        marshallOptions,
      }
    );
  }

  ddbClient = global.ddbClient;
}

export { ddbClient };
