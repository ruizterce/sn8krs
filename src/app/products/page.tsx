import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/api";

export default async function Products() {
  const products = await fetchProducts();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Products</h1>
      <div className="flex flex-wrap gap-6 items-center justify-center">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.title}
              price={product.avg_price}
              image={product.image}
              quantity={1}
            />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}
