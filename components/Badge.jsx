import { bn } from "@/lib/api";
export default function Badge({ v }) {
  const a = Math.abs(v), c = v > 0 ? "text-green-600 bg-green-50" : v < 0 ? "text-red-600 bg-red-50" : "text-gray-500 bg-gray-100";
  return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${c}`}>{v > 0 ? "▲" : v < 0 ? "▼" : "—"} {bn(a.toFixed(1))}%</span>;
}
