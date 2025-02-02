import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

const db = new DynamoDBClient({ region: "eu-west-1" });

export const handler = async (event) => {
  const { limit, lastEvaluatedKey } = event.queryStringParameters || {};

  // Decode lastEvaluatedKey if it's provided
  const decodedLastEvaluatedKey = lastEvaluatedKey
    ? JSON.parse(decodeURIComponent(lastEvaluatedKey)) // Decode and parse the URL-encoded key
    : undefined;

  const params = {
    TableName: "sn8krs_products",
    Limit: limit ? parseInt(limit, 10) : 10,
    ExclusiveStartKey: decodedLastEvaluatedKey, // Use the decoded value here
  };

  try {
    const command = new ScanCommand(params);
    const data = await db.send(command);

    return {
      statusCode: 200,
      body: {
        items: data.Items,
        lastEvaluatedKey: data.LastEvaluatedKey
          ? JSON.stringify(data.LastEvaluatedKey) // Return the lastEvaluatedKey as a JSON string
          : null,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch products" }),
    };
  }
};
