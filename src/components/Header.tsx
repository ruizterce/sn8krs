"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalQuantity, setCartState } from "@/store/cartSlice";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/data";
import { loadState } from "@/lib/localStorage";

export default function Header() {
  const pathname = usePathname();
  const totalQuantity = useSelector(selectTotalQuantity);
  const [categoryDropdown, setCategoryDropdown] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const persistedState = loadState();
    if (persistedState && persistedState.cart) {
      dispatch(setCartState(persistedState.cart));
    }
  }, [dispatch]);

  return (
    <header className="z-10 bg-background text-foreground border-b-2 border-primary px-6 py-1 hover:drop-shadow-md-h hover:translate-y-1 transition-all duration-500">
      <h1 className="absolute top-[5px] text-2xl font-futuraExtraBoldOblique drop-shadow-sm-h hover:drop-shadow-md-h hover:-translate-x-[8px] hover:-translate-y-[8px] transition-all duration-200">
        <Link href="/">SN8KRS</Link>
      </h1>

      <nav className="flex gap-4 w-full justify-center items-end font-futuraBoldOblique text-2xl ">
        <Link
          href="/products"
          className={`hover:drop-shadow-md-h hover:-translate-y-[5px] hover:-translate-x-[5px] transition-all duration-200 ${
            pathname.endsWith("/products")
              ? "drop-shadow-xs-h font-black line-through"
              : ""
          }`}
        >
          Products
        </Link>

        <div
          className={`hover:-translate-y-[5px] hover:-translate-x-[5px]  transition-all duration-200 relative`}
          onMouseEnter={() => {
            setCategoryDropdown(true);
          }}
          onMouseLeave={() => {
            setCategoryDropdown(false);
          }}
        >
          <span className={`${categoryDropdown ? "drop-shadow-md-h" : ""}`}>
            Categories
          </span>
          <div
            id="dropdown"
            className={`absolute bg-background p-3 w-32 origin-top transition-all duration-200 ease-in-out ${
              categoryDropdown ? "scale-y-1" : "scale-y-0"
            }`}
          >
            {CATEGORIES.map((category) => (
              <div
                key={category}
                className={`mb-2 hover:drop-shadow-sm-h hover:-translate-y-[2px] hover:-translate-x-[2px] transition-all duration-200 ease-in-out ${
                  pathname.includes(`/${category}`)
                    ? "drop-shadow-xs-h font-black line-through"
                    : ""
                }`}
              >
                <Link href={`/products/${category}`} className="p-4">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/cart"
          className={`hover:drop-shadow-md-h hover:-translate-y-[5px] hover:-translate-x-[5px] transition-all duration-200 ${
            pathname.startsWith("/cart")
              ? "drop-shadow-xs-h font-black line-through"
              : ""
          }`}
        >
          Cart
        </Link>

        <Link
          href="/account"
          className={`hover:drop-shadow-md-h hover:-translate-y-[5px] hover:-translate-x-[5px] transition-all duration-200 ${
            pathname.startsWith("/account")
              ? "drop-shadow-xs-h font-black line-through"
              : ""
          }`}
        >
          Account
        </Link>
      </nav>
      <Link href={"/cart"} className="absolute top-2 right-7 flex">
        <span className="bg-primary text-background rounded-full px-2 h-6 text-center font-bold">
          {totalQuantity}
        </span>
        <ShoppingCart color="black" size={24} className="" />
      </Link>
    </header>
  );
}
