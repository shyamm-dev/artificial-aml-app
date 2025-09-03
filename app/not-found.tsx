import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="text-lg">Could not find the requested page.</p>
      <Link href="/" className="mt-4 text-blue-500 hover:underline">
        Return Home
      </Link>
    </div>
  );
}
