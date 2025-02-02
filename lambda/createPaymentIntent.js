import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
const db = new DynamoDBClient({ region: "eu-west-1" });

export async function handler(event) {
  console.log("Received event:", JSON.stringify(event, null, 2));

  try {
    const { cartItems, userId } = event.body || "{}"; // Cart items from the client: [{ id, quantity }, ...]
    console.log("cartItems:", cartItems);
    console.log("userId:", userId);

    if (!cartItems || !cartItems.length) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Cart is empty" }),
      };
    }

    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "User ID is missing" }),
      };
    }

    let totalAmount = 0; // Total amount in cents
    let productDescriptions = [];

    // Fetch each product's price and calculate the total amount
    for (const item of cartItems) {
      const params = {
        TableName: "sn8krs_products",
        Key: { id: item.id, category: item.category },
      };

      const command = new GetCommand(params);
      const product = await db.send(command);

      if (!product.Item) {
        return {
          statusCode: 404,
          body: JSON.stringify({
            error: `Product with ID ${item.id} not found`,
          }),
        };
      }

      const productPrice = product.Item.avg_price; // Assume price is in dollars
      const productQuantity = item.quantity;
      totalAmount += Math.round(productPrice * productQuantity * 100); // Stripe expects amounts in cents
      console.log("Prices");
      console.log(productPrice);
      console.log(totalAmount);

      productDescriptions.push(
        `${product.Item.title} (x${productQuantity}): $${(
          productPrice * productQuantity
        ).toFixed(2)}`
      );
    }
    console.log(productDescriptions);
    // Create a PaymentIntent with the total amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        userId: userId,
        orderDetails: productDescriptions.join(", "), // Optional metadata
      },
    });

    // Return client secret to the frontend
    return {
      statusCode: 200,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      }),
    };
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
}
