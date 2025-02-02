import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({ region: "eu-west-1" });
const docClient = DynamoDBDocumentClient.from(client);

export async function handler(event) {
  console.log("Received event:", JSON.stringify(event, null, 2));

  // Ensure headers exist
  if (!event.headers) {
    console.error("Missing headers in event");
    return { statusCode: 400, body: "Missing headers" };
  }

  const sig =
    event.headers["stripe-signature"] || event.headers["Stripe-Signature"]; // Handle case sensitivity
  if (!sig) {
    console.error("Stripe signature missing");
    return { statusCode: 400, body: "Stripe signature missing" };
  }

  let stripeEvent;

  try {
    // Verify webhook signature
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook Error:", err);
    return { statusCode: 400, body: `Webhook error: ${err.message}` };
  }

  // Handle successful payments
  if (stripeEvent.type === "payment_intent.succeeded") {
    const paymentIntent = stripeEvent.data.object;
    const orderId = paymentIntent.id;
    const amount = paymentIntent.amount; // Amount in cents
    const currency = paymentIntent.currency;
    const metadata = paymentIntent.metadata;

    // Extract order details from metadata
    const items = metadata.orderDetails
      ? metadata.orderDetails.split(", ")
      : [];

    // Save order to DynamoDB
    const orderData = {
      TableName: "sn8krs_orders",
      Item: {
        orderId,
        userId: metadata.userId || "guest",
        amount,
        currency,
        status: "completed",
        items,
        createdAt: new Date().toISOString(),
      },
    };

    try {
      const command = new PutCommand(orderData);
      const response = await docClient.send(command);
      console.log("Order saved:", orderData.Item);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Order saved", response }),
      };
    } catch (dbError) {
      console.error("DynamoDB Error:", dbError);
      return { statusCode: 500, body: "Error saving order" };
    }
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "Event received" }),
  };
}
