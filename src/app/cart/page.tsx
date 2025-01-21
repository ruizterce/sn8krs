"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Image from "next/image";

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  return (
    <div className="h-full pt-4 px-4 pb-6 flex flex-col items-center gap-8">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
              />
              <p>{item.name}</p>
              <p>${item.price.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
