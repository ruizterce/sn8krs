import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/api";

export default async function Products() {
  const products = await fetchProducts();

  return (
    <div className="pt-4 pr-2 pb-6">
      <h1 className="fixed text-xl font-bold [writing-mode:sideways-lr]">
        Products
      </h1>
      <div className="flex px-5 flex-wrap gap-6 items-center justify-center">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.title}
              color={product.color}
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
