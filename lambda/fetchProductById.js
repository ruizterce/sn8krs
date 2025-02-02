import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

const db = new DynamoDBClient({ region: "eu-west-1" });

export const handler = async (event) => {
  const { id, category } = event.pathParameters || {};

  if (!category) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Missing or invalid 'category' parameter",
      }),
    };
  }

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing or invalid 'id' parameter" }),
    };
  }

  const params = {
    TableName: "sn8krs_products",
    Key: { id, category },
  };

  try {
    const command = new GetCommand(params);
    const data = await db.send(command);

    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Product not found" }),
      };
    }

    return {
      statusCode: 200,
      body: data.Item,
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch product" }),
    };
  }
};
