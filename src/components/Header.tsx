import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-primary text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold w-8">
          <Link href="/">SN8KRS</Link>
        </h1>
        <nav className="flex space-x-4">
          <Link href="/products">Products</Link>

          <Link href="/cart">Cart</Link>

          <Link href="/account">Account</Link>
        </nav>
      </div>
    </header>
  );
}
