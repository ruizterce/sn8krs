export default function Product({ params }: { params: { id: string } }) {
  const { id } = params;
  return <>Product {id}</>;
}
