"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Image from "next/image";
import {
  calculateCartTotal,
  removeFromCart,
  updateQuantity,
} from "@/store/cartSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const totalPrice = useSelector(calculateCartTotal);

  return (
    <div className="h-full pt-4 px-2 sm:px-10 pb-6 flex flex-col items-center gap-8">
      <h1 className="fixed left-1 py-4 text-3xl font-futuraBold [writing-mode:sideways-lr]">
        Your Cart
      </h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="w-full max-w-5xl flex flex-col items-center gap-6">
          <table className=" table-fixed border-collapse text-sm sm:text-base lg:text-lg drop-shadow-md-h overflow-hidden">
            <thead className="bg-primary text-white">
              <tr className="font-futuraExtraBold">
                <th className="py-3 w-full border-b border-gray-700">
                  Product
                </th>
                <th className="sm:px-2 py-3 w-6 sm:w-12 border-b border-gray-700">
                  Qty
                </th>
                <th className="py-3 w-16 sm:w-20 text-center border-b border-gray-700">
                  Price
                </th>
                <th className="py-3 w-16 sm:w-20 text-center border-b border-gray-700">
                  Subtotal
                </th>
                <th className="w-8 sm:w-12"></th>
              </tr>
            </thead>
            <tbody className="bg-white text-black">
              {cartItems.map((item) => (
                <tr
                  key={item.id + item.size}
                  className="hover:bg-gray-100 border-b border-gray-300"
                >
                  <td>
                    <Link href={`products/${item.category}/${item.id}`}>
                      <div className="px-4 py-2 flex items-center gap-6">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                        />
                        <span className="whitespace-nowrap truncate">
                          {item.name} {item.size ? "| Size: " + item.size : ""}
                        </span>
                      </div>{" "}
                    </Link>
                  </td>
                  <td className="py-2 text-center whitespace-nowrap border-r border-gray-300">
                    <input
                      className="text-center w-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none flex-grow-0"
                      type="number"
                      value={item.quantity}
                      min={1}
                      max={99}
                      step={1}
                      onChange={(e) => {
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: Number(e.target.value),
                            size: item.size,
                          })
                        );
                      }}
                    />
                  </td>
                  <td className="py-2 text-center whitespace-nowrap border-r border-gray-300">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="py-2 text-center whitespace-nowrap border-r border-gray-300">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="flex flex-col items-center">
                    <button
                      className="bg-primary h-6 w-6 text-background px-2 py-1 rounded-full leading-3"
                      onClick={() => {
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity + 1,
                            size: item.size,
                          })
                        );
                      }}
                    >
                      +
                    </button>
                    <button
                      className="bg-primary h-6 w-6 text-background px-2 py-1 rounded-full leading-3"
                      onClick={() => {
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity - 1,
                            size: item.size,
                          })
                        );
                      }}
                    >
                      -
                    </button>
                    <button
                      className="bg-primary h-6 w-6 text-background px-2 py-1 rounded-full leading-3"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Remove "${item.name} ${
                              item.size ? "| Size: " + item.size : ""
                            }" from your cart?`
                          )
                        ) {
                          dispatch(
                            removeFromCart({ id: item.id, size: item.size })
                          );
                        }
                      }}
                    >
                      x
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-200 ">
                <td className="px-4 py-2 text-right text-sm" colSpan={2}>
                  <div className="flex justify-end gap-8">
                    <span>Items: ${(totalPrice * 0.79).toFixed(2)}</span>
                    <span>Taxes: ${(totalPrice * 0.21).toFixed(2)}</span>
                  </div>
                </td>
                <td className="px-4 py-2 text-right font-bold" colSpan={2}>
                  Total: ${totalPrice.toFixed(2)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
          <Link
            href="/cart/checkout"
            className="w-56 text-center py-1 bg-primary text-background text-2xl font-futuraExtraBoldOblique drop-shadow-md-h hover:bg-secondary"
          >
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
}
