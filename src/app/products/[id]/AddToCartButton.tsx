"use client";
import { addToCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";

export default function AddToCartButton({
  product,
}: {
  product: { id: string; title: string; avg_price: number; image: string };
}) {
  const dispatch = useDispatch();
  return (
    <button
      className="bg-primary text-background px-2 py-1"
      onClick={() => {
        dispatch(
          addToCart({
            id: product.id,
            name: product.title,
            price: product.avg_price,
            image: product.image,
            quantity: 1,
          })
        );
      }}
    >
      Add to Cart
    </button>
  );
}
