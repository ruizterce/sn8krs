"use client";
import { addToCart } from "@/store/cartSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const SIZE_STREETWEAR = ["XS", "S", "M", "L", "XL", "XXL"];
const SIZE_SNEAKERS = [6, 7, 8, 9, 10, 11, 12];

export default function AddToCartButton({
  product,
}: {
  product: {
    id: string;
    category: string;
    title: string;
    avg_price: number;
    image: string;
  };
}) {
  const [quantity, setQuantity] = useState<number>(1);
  const [size, setSize] = useState<number | string | undefined>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (quantity < 1) {
      setQuantity(1);
    }
    if (quantity > 99) {
      setQuantity(99);
    }
  }, [quantity]);

  return (
    <div className="flex flex-col gap-2">
      {product.category === "sneakers" && (
        <div className="flex gap-2">
          {SIZE_SNEAKERS.map((sneakerSize) => {
            return (
              <div
                key={sneakerSize}
                className={`text-center w-8 border cursor-pointer ${
                  sneakerSize === size ? "bg-primary" : ""
                }`}
                onClick={() => {
                  setSize(sneakerSize);
                }}
              >
                {sneakerSize}
              </div>
            );
          })}{" "}
        </div>
      )}

      {product.category === "streetwear" && (
        <div className="flex gap-2">
          {SIZE_STREETWEAR.map((streetwearSize) => {
            return (
              <div
                key={streetwearSize}
                className={`text-center w-8 border cursor-pointer ${
                  streetwearSize === size ? "bg-primary" : ""
                }`}
                onClick={() => {
                  setSize(streetwearSize);
                }}
              >
                {streetwearSize}
              </div>
            );
          })}{" "}
        </div>
      )}

      <div className="flex items-center gap-2">
        <div className="flex">
          <button
            className="bg-primary h-6 w-6 text-background px-2 py-1 rounded-full leading-3"
            onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
              }
            }}
          >
            -
          </button>
          <input
            className="text-center w-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none flex-grow-0"
            type="number"
            value={quantity}
            min={1}
            max={99}
            step={1}
            onChange={(e) => {
              setQuantity(Number(e.target.value));
            }}
          />
          <button
            className="bg-primary h-6 w-6 text-background px-2 py-1 rounded-full leading-3"
            onClick={() => {
              setQuantity(quantity + 1);
            }}
          >
            +
          </button>
        </div>
        <button
          className="bg-primary text-background px-2 py-1"
          onClick={() => {
            if (
              (product.category === "streetwear" ||
                product.category === "sneakers") &&
              size === undefined
            ) {
              alert("Please select a size");
            } else {
              dispatch(
                addToCart({
                  id: product.id,
                  category: product.category,
                  name: product.title,
                  price: product.avg_price,
                  image: product.image,
                  quantity,
                  size,
                })
              );
            }
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
