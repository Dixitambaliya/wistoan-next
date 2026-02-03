import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black pt-24">
      <h1 className="text-2xl font-serif text-white mb-8">Model Not Found</h1>
      <Link
        href="/collection"
        className="text-amber-500 uppercase tracking-widest text-xs border border-amber-500/20 px-8 py-3 rounded-full hover:bg-amber-500 hover:text-black transition-all"
      >
        Return to Collection
      </Link>
    </div>
  );
}
