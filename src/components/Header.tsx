import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">SN8KRS</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
            <li>
              <Link href="/account">Account</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
