import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page">
      <h1 className="bold">Page not found</h1>
      <p>
        <Link href="/">Hjörtur Jóhannsson</Link>
      </p>
    </main>
  );
}
