import { Product } from "@/types/product";

export async function fetchProducts(): Promise<Product[]> {
  const options = {
    method: "GET",
    headers: { Authorization: process.env.NEXT_SNEAKERSAPI_KEY || "" },
  };

  try {
    const response = await fetch(
      "https://api.sneakersapi.dev/api/v2/products?category=sneakers",
      options
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return data.data; // Return the array of products
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
