import { Product } from "@/types/product";
const baseUrl = process.env.NEXT_AWS_API_GATEWAY_URL;

export async function fetchProducts(): Promise<Product[]> {
  const options = {
    method: "GET",
    headers: { Authorization: process.env.NEXT_SNEAKERSAPI_KEY || "" },
  };

  try {
    const response = await fetch(`${baseUrl}/dev/products`, options);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return data.body.items;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function fetchProductById(id: string): Promise<Product> {
  const options = {
    method: "GET",
    headers: { Authorization: process.env.NEXT_SNEAKERSAPI_KEY || "" },
  };

  try {
    const response = await fetch(`${baseUrl}/dev/products/${id}`, options);

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}
