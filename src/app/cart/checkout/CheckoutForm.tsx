"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";

interface CheckoutFormProps {
  totalPrice: number; // Pass the total price as a prop
}

export default function CheckoutForm({ totalPrice }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | undefined | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart/checkout/complete`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    theme: "stripe",
    layout: "accordion",
  };

  return (
    <div className="flex flex-col items-center">
      <p>For testing pruposes use this fake Card:</p>
      <table className="table-fixed border-collapse bg-background mt-2 drop-shadow-md-h">
        <tbody>
          <tr className="border-2">
            <td className="p-3 select-none">Card Number</td>
            <td className="p-3 select-all text-center font-bold">
              4242424242424242
            </td>
          </tr>
          <tr className="border-2">
            <td className="p-3 select-none">Expiration date</td>
            <td className="p-3 select-all text-center font-bold">11/33</td>
          </tr>
          <tr className="border-2">
            <td className="p-3 select-none">Security code</td>
            <td className="p-3 select-all text-center font-bold">424</td>
          </tr>
        </tbody>
      </table>
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6 mt-6"
      >
        <PaymentElement
          id="payment-element"
          options={paymentElementOptions as StripePaymentElementOptions}
          className="drop-shadow-md-h"
        />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="w-56 py-1 bg-primary text-background text-2xl font-futuraExtraBoldOblique drop-shadow-md-h hover:bg-secondary"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              `Pay $${totalPrice}`
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && (
          <div id="payment-message" className="text-primary">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
