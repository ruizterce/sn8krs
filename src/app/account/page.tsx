"use client";

import { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import { AuthEventData } from "@aws-amplify/ui";
import "@aws-amplify/ui-react/styles.css";
import "./styles.css";
import awsconfig from "../../../aws-exports";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useAuthValidation } from "@/hooks/useAuthValidation";
import { fetchOrdersByUserId } from "@/lib/api";
import { Order } from "@/types/order";

Amplify.configure(awsconfig);

export default function Account() {
  return (
    <div className="h-full">
      <Authenticator
        loginMechanisms={["email"]}
        signUpAttributes={["name"]}
        className="h-full flex flex-col justify-center drop-shadow-lg-h font-bold"
      >
        {({ signOut }) => {
          return <AuthenticatedView signOut={signOut} />;
        }}
      </Authenticator>
    </div>
  );
}

const AuthenticatedView = ({
  signOut,
}: {
  signOut: ((data?: AuthEventData | undefined) => void) | undefined;
}) => {
  const loadingAuth = useAuthValidation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const [orders, setOrders] = useState<Order[]>([]);
  const [showItemsModalId, setShowItemsModalId] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const fetchedOrders = await fetchOrdersByUserId(
          "e2d5f484-6021-7006-cb67-087a60404d9d"
        );
        console.log(fetchedOrders);
        setOrders(fetchedOrders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load the orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading || loadingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="h-full pt-4 px-4 pb-6 flex flex-col items-center gap-4">
      <h1 className="text-3xl font-futuraBold">
        What&apos;s up,{" "}
        <span className="drop-shadow-sm-h font-futuraBoldOblique">
          {user?.name}
        </span>
        !
      </h1>

      <button
        className="py-1 px-4 font-futuraExtraBold text-xl bg-primary text-background drop-shadow-md-h hover:bg-secondary"
        onClick={signOut}
      >
        Sign out
      </button>

      <div>
        <p className="font-futuraBold text-xl">Order history</p>

        {error ? (
          <div className="flex justify-center items-center min-h-screen">
            <p className="text-xl font-semibold text-red-600">{error}</p>
          </div>
        ) : (
          <table className="table-fixed border-collapse text-sm sm:text-base lg:text-md drop-shadow-md-h overflow-hidden">
            <thead className="bg-primary text-white">
              <tr className="font-futuraExtraBold">
                <th className="py-3 w-full border-b border-gray-700">
                  Order ID
                </th>
                <th className="sm:px-2 py-3 w-6 sm:w-12 border-b border-gray-700">
                  Date
                </th>
                <th className="py-3 w-16 sm:w-20 text-center border-b border-gray-700">
                  Status
                </th>
                <th className="py-3 w-16 sm:w-20 text-center border-b border-gray-700">
                  Amount
                </th>
                <th className="w-8 sm:w-12">Items</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-900">
              {orders.map((order) => (
                <tr
                  key={order.orderId}
                  className="hover:bg-gray-100 border-b border-gray-300"
                >
                  <td className="p-2 border-r border-gray-300">
                    {order.orderId}
                  </td>
                  <td className="p-2 text-center whitespace-nowrap border-r border-gray-300 flex gap-2 justify-between">
                    {(() => {
                      const date = new Date(order.createdAt);
                      const day = date.toLocaleString().split(",")[0];
                      const hour = date.toLocaleString().split(",")[1];
                      return (
                        <>
                          <span>{day}</span>{" "}
                          <span className="text-sm text-gray-600">{hour}</span>
                        </>
                      );
                    })()}
                  </td>
                  <td className="p-2 text-center whitespace-nowrap border-r border-gray-300">
                    {order.status}
                  </td>
                  <td className="p-2 text-center whitespace-nowrap border-r border-gray-300">
                    ${(order.amount / 100).toFixed(2)}
                  </td>
                  <td className="p-2 flex h-10 justify-center items-center">
                    <button
                      onClick={() => {
                        setShowItemsModalId(order.orderId);
                      }}
                      className="px-2 h-6 bg-primary hover:bg-secondary font-futuraExtraBold text-background"
                    >
                      Show
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {orders.map((order) => (
        <div
          key={`${order.orderId}-items`}
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-gray-500 bg-opacity-70 h-full w-full flex flex-col items-center justify-center ${
            showItemsModalId === order.orderId ? "" : "hidden"
          }`}
        >
          <div className="relative p-10 bg-background">
            <button
              onClick={() => {
                setShowItemsModalId(null);
              }}
              className="absolute top-0 right-0 p-2"
            >
              Close
            </button>
            <table className="border-collapse border-2">
              <tbody>
                <tr className=" border-2">
                  <td className="px-2">Order {order.orderId}</td>
                </tr>
                <tr className="border-2">
                  <td className="px-2">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>

                {order.items.map((item) => {
                  const description = item.split(":")[0];
                  const amount = item.split(":")[1];
                  return (
                    <tr key={item}>
                      <td className="px-2">{description}</td>
                      <td className="px-2 text-end">{amount}</td>
                    </tr>
                  );
                })}

                <tr className="border-2">
                  <td className="px-2">Total</td>
                  <td className="px-2 text-end">
                    ${(order.amount / 100).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};
