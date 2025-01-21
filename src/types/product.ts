export type Product = {
  id: string;
  title: string;
  description: string;
  brand: string;
  category: string;
  color: string;
  image: string;
  avg_price: number;
  currency: string;
  sku: string;
  weekly_orders: { orders: number; position: number };
};
