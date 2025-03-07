import { Product } from "@/types/product";
import { Order } from "@/types/order";
const baseUrl = process.env.NEXT_PUBLIC_AWS_API_GATEWAY_URL;

export async function fetchProducts(
  limit: number = 10,
  lastEvaluatedKey?: string
): Promise<{ items: Product[]; lastEvaluatedKey: string | null }> {
  const options = {
    method: "GET",
  };
  const queryParams = new URLSearchParams({ limit: String(limit) });
  if (lastEvaluatedKey) {
    // Automatically URL-encode the lastEvaluatedKey if it's provided
    queryParams.append(
      "lastEvaluatedKey",
      encodeURIComponent(lastEvaluatedKey)
    );
  }

  console.log(`${baseUrl}/products?${queryParams.toString()}`);
  try {
    const response = await fetch(
      `${baseUrl}/products?${queryParams.toString()}`,
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

export async function fetchProductsByCategory(
  category: string,
  brand: string | null = null,
  limit: number = 10,
  lastEvaluatedKey?: string
): Promise<{ items: Product[]; lastEvaluatedKey: string | null }> {
  const options = {
    method: "GET",
  };

  const queryParams = new URLSearchParams({
    limit: String(limit),
  });
  if (brand) {
    queryParams.append("brand", brand);
  }
  if (lastEvaluatedKey) {
    // Automatically URL-encode the lastEvaluatedKey if it's provided
    queryParams.append("lastEvaluatedKey", lastEvaluatedKey);
  }
  try {
    const response = await fetch(
      `${baseUrl}/products/${category}?${queryParams.toString()}`,
      options
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    console.log("fetch received lastEvaluatedKey");
    console.log(data.body.lastEvaluatedKey);
    return {
      items: data.body.items,
      lastEvaluatedKey: data.body.lastEvaluatedKey
        ? data.body.lastEvaluatedKey
        : null,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { items: [], lastEvaluatedKey: null };
  }
}

export async function fetchProductById(
  category: string,
  id: string
): Promise<Product> {
  const options = {
    method: "GET",
  };

  try {
    const response = await fetch(
      `${baseUrl}/products/${category}/${id}`,
      options
    );

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = await response.json();
    return data.body;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

export async function fetchOrdersByUserId(userId: string): Promise<Order[]> {
  const options = {
    method: "GET",
  };

  try {
    const response = await fetch(`${baseUrl}/orders?userId=${userId}`, options);

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data = await response.json();
    return data.body.items;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}
