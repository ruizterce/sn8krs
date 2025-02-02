import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const db = new DynamoDBClient({ region: "eu-west-1" });

export const handler = async (event) => {
  const { category } = event.pathParameters || {};
  const {
    limit,
    lastEvaluatedKey: encodedKey,
    brand,
  } = event.queryStringParameters || {};

  try {
    if (!category) {
      throw new Error("Missing category parameter");
    }

    // Decode lastEvaluatedKey if provided
    const decodedLastEvaluatedKey = encodedKey
      ? JSON.parse(decodeURIComponent(encodedKey))
      : undefined;

    const sanitizedBrand = brand ? brand.trim() : undefined;

    const params = {
      TableName: "sn8krs_products",
      IndexName: "category-brand-index",
      Limit: limit ? parseInt(limit, 10) : 10,
      ExclusiveStartKey: decodedLastEvaluatedKey,
      KeyConditionExpression: sanitizedBrand
        ? "category = :category AND brand = :brand"
        : "category = :category",
      ExpressionAttributeValues: sanitizedBrand
        ? {
            ":category": { S: category },
            ":brand": { S: sanitizedBrand },
          }
        : {
            ":category": { S: category },
          },
    };
    console.log(params);
    const command = new QueryCommand(params);
    const data = await db.send(command);

    // Unmarshall items
    const items = data.Items.map((item) => unmarshall(item));

    return {
      statusCode: 200,
      body: {
        items,
        lastEvaluatedKey: data.LastEvaluatedKey
          ? JSON.stringify(data.LastEvaluatedKey) // Return the lastEvaluatedKey as a JSON string
          : null,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    const statusCode =
      error.message === "Missing category parameter" ? 400 : 500;
    return {
      statusCode,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
