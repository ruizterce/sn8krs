import { Product } from "@/types/product";
const baseUrl = "https://8tdu6s07b3.execute-api.eu-west-1.amazonaws.com";

export async function fetchProducts(
  limit: number = 10,
  lastEvaluatedKey?: string
): Promise<{ items: Product[]; lastEvaluatedKey: string | null }> {
  const options = {
    method: "GET",
    headers: { Authorization: process.env.NEXT_SNEAKERSAPI_KEY || "" },
  };

  const queryParams = new URLSearchParams({ limit: String(limit) });
  if (lastEvaluatedKey) {
    // Automatically URL-encode the lastEvaluatedKey if it's provided
    queryParams.append(
      "lastEvaluatedKey",
      encodeURIComponent(lastEvaluatedKey)
    );
  }

  try {
    const response = await fetch(
      `${baseUrl}/dev/products?${queryParams.toString()}`,
      options
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    return {
      items: data.body.items,
      lastEvaluatedKey: data.body.lastEvaluatedKey, // Return the lastEvaluatedKey as is
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { items: [], lastEvaluatedKey: null };
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
