import React from "react";
import { fetchProductById } from "@/lib/api";
import Image from "next/image";

export default async function Product({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const product = await fetchProductById(id);
    console.log(product);

    return (
      <div className="sm:pt-4 px-2 pb-6 ">
        <h1 className="sm:fixed text-3xl font-bold sm:[writing-mode:sideways-lr]">
          {product.brand}
        </h1>
        <div className="grid md:grid-cols-[1fr_1fr] space-x-8 max-w-[1600px] mx-auto">
          <div className="sm:ml-8 max-w-3xl mx-auto bg-background ">
            <Image
              src={product.image}
              alt={product.title}
              width={725}
              height={517}
              className="object-cover border mb-6 mx-auto p-6 shadow-lg-h"
              priority={false}
            />
            <div className="flex gap-2">
              <span>Weekly Position:</span>
              <span> {product.weekly_orders.position}</span>
              <span>Orders:</span>
              <span> {product.weekly_orders.orders}</span>
            </div>
          </div>
          <div className="p-4 flex flex-col justify-between max-w-[700px] text-justify">
            <div>
              <h1 className=" text-2xl font-bold mb-2 text-foreground drop-shadow-sm-h">
                {product.title}
              </h1>{" "}
              <p className="text-lg font-bold text-gray-900">{product.color}</p>
              <p className="text-sm text-gray-500">SKU: {product.sku}</p>
              <p className="my-3 text-2xl font-extrabold text-primary">
                ${product.avg_price.toFixed(2)}
              </p>
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
