"use client";

import { useState, useEffect } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import CompletePage from "./CompletePage";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { calculateCartTotal } from "@/store/cartSlice";
import { useAuthValidation } from "../../../hooks/useAuthValidation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function Page() {
  const [clientSecret, setClientSecret] = useState("");
  const [confirmed, setConfirmed] = useState<string | boolean | null>(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector(calculateCartTotal); // For display pruposes only, the total amount sent to the payment platform is calculated in the backend from item prices in the database
  const loading = useAuthValidation();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    setConfirmed(
      new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      )
    );
  });

  useEffect(() => {
    if (!user) return;
    // Create PaymentIntent as soon as the page loads
    fetch(
      `${process.env.NEXT_PUBLIC_AWS_API_GATEWAY_URL}/dev/orders/create-payment-intent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems,
          userId: user.id,
        }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to create payment intent");
        }
        return res.json();
      })
      .then((data) => {
        setClientSecret(JSON.parse(data.body).clientSecret);
      })
      .catch((error) => console.error("Error:", error));
  }, [user]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !user) return <div>Please log in</div>;

  return (
    <div className="h-full flex flex-col items-center justify-start my-10 overflow-auto">
      <div>User id: {user.id}</div>

      <div className="w-2/3">
        {clientSecret ? (
          <Elements
            options={options as StripeElementsOptions}
            stripe={stripePromise}
          >
            {confirmed ? (
              <CompletePage />
            ) : (
              <CheckoutForm totalPrice={Number(totalPrice.toFixed(2))} />
            )}
          </Elements>
        ) : (
          <div className="text-center">Loading Payment Platform...</div>
        )}
      </div>
    </div>
  );
}
