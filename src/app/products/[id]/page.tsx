import React from "react";
import { fetchProductById } from "@/lib/api";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import { PageProps } from "../../../../.next/types/app/page";

export default async function ProductPage({ params }: PageProps) {
  try {
    const { id } = (await params) as unknown as { id: string };
    const product = await fetchProductById(id);
    return (
      <div className="sm:pt-4 px-2 pb-6 ">
        <h1 className="sm:fixed text-3xl font-bold sm:[writing-mode:sideways-lr]">
          {product.brand}
        </h1>
        <div className="grid place-items-center xl:grid-cols-[1fr_1fr] gap-8 max-w-[1600px] mx-auto">
          <div className="sm:ml-8 max-w-3xl  bg-background ">
            <Image
              src={product.image}
              alt={product.title}
              width={725}
              height={517}
              className="object-cover border mb-6 mx-auto p-6 shadow-lg-h"
              priority={false}
            />
          </div>
          <div className="p-4 flex ml-7 flex-col justify-between max-w-[725px] text-justify">
            <div>
              <h1 className=" text-2xl font-bold mb-2 text-foreground drop-shadow-sm-h">
                {product.title}
              </h1>{" "}
              <p className="text-lg font-bold text-gray-900">{product.color}</p>
              <p className="text-sm text-gray-500">SKU: {product.sku}</p>
              <p className="my-3 text-2xl font-extrabold text-primary">
                ${product.avg_price.toFixed(2)}
              </p>
              <AddToCartButton product={product} />
            </div>
            <div className="my-3 ">
              <p className="text-gray-700 leading-relaxed">
                {product.description.split("<br>").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return (
      <div>
        <h1>Product not found</h1>
      </div>
    );
  }
}
