import { SmoothLink as Link } from "@/components/motion/SmoothLink";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 pt-10 pb-32">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-4"><Link href="/" className="underline">Go to the homepage</Link></p>
    </div>
  );
}
