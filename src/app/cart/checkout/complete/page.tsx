"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CompletePage from "../CompletePage";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function Wrapper() {
  return (
    <Elements stripe={stripePromise}>
      <CompleteWrapper />
    </Elements>
  );
}

function CompleteWrapper() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <CompletePage />
    </div>
  );
}
