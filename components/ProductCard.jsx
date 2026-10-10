import Link from "next/link";
import Badge from "./Badge";
import { money } from "@/lib/api";
export default function ProductCard({ p }) {
  return (
    <Link href={`/product/${p.slug}`} className="card bg-white border border-base-200 hover:shadow-lg transition">
      <div className="card-body p-4 gap-1">
        <div className="text-5xl">{p.emoji}</div>
        <h3 className="font-bold text-lg">{p.name}</h3>
        <p className="text-sm text-gray-500">{p.unit}</p>
        <div className="flex items-center justify-between mt-2">
          <div><p className="text-xs text-gray-500">আজকের দাম</p><p className="font-bold">{money(p.price)}</p></div>
          <Badge v={p.change} />
        </div>
      </div>
    </Link>
  );
}
