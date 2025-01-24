"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "@/store/cartSlice";
import { ShoppingCart } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const totalQuantity = useSelector(selectTotalQuantity);

  return (
    <header className="z-10 bg-background text-foreground border-b-2 border-primary px-4 py-1 hover:drop-shadow-md-h hover:translate-y-1 transition-all duration-500">
      <h1 className="absolute top-[5px] text-2xl font-futuraExtraBoldOblique drop-shadow-sm-h hover:drop-shadow-md-h hover:-translate-x-[8px] hover:-translate-y-[8px] transition-all duration-200">
        <Link href="/">SN8KRS</Link>
      </h1>

      <nav className="flex gap-4 w-full justify-center items-end font-futuraBoldOblique text-2xl ">
        <Link
          href="/products"
          className={`hover:drop-shadow-md-h hover:-translate-y-[5px] hover:-translate-x-[5px] transition-all duration-200 ${
            pathname.startsWith("/products")
              ? "drop-shadow-xs-h font-black line-through"
              : ""
          }`}
        >
          Products
        </Link>

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
      <Link href={"/cart"} className="absolute top-2 right-4 flex">
        <span className="bg-primary text-background rounded-full px-2 h-6 text-center font-bold">
          {totalQuantity}
        </span>
        <ShoppingCart color="black" size={24} className="" />
      </Link>
    </header>
  );
}
