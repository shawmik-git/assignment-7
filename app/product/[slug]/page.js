import { notFound } from "next/navigation";
import { getJSON, norm, money } from "@/lib/api";
import Badge from "@/components/Badge";
export default async function Product({ params }) {
  let p; try { p = norm(await getJSON(`/products/${params.slug}`)); } catch { notFound(); }
  if (!p?.name) notFound();
  const m = (p.markets || []).map((x) => ({ name: x.name || x.market || x.bazar, price: Number(String(x.price ?? x.todayPrice).replace(/[^\d.]/g, "")) || 0 }));
  const v = m.map((x) => x.price), min = v.length ? Math.min(...v) : p.price, max = v.length ? Math.max(...v) : p.price, avg = v.length ? v.reduce((a, b) => a + b, 0) / v.length : p.price;
  const tags = [].concat(p.tags || p.category || []);
  return <div className="py-8 space-y-6">
    <div className="card bg-white border p-6"><div className="flex items-center gap-4"><span className="text-6xl">{p.emoji}</span>
      <div><h1 className="text-3xl font-bold">{p.name}</h1><p className="text-gray-600">{p.desc}</p>
        <div className="flex flex-wrap gap-2 mt-2">{tags.map((t) => <span key={t} className="badge badge-success badge-outline">{t}</span>)}<span className="badge">{p.unit}</span><Badge v={p.change} /></div></div></div></div>
    <div className="grid grid-cols-3 gap-3 text-center">{[["সর্বনিম্ন", min], ["সর্বোচ্চ", max], ["গড়", Math.round(avg)]].map(([t, x]) => <div key={t} className="card bg-white border p-4"><p className="text-sm text-gray-500">{t} দাম</p><p className="font-bold text-lg">{money(x)}</p></div>)}</div>
    <h2 className="text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{m.map((x, i) => <div key={i} className="card bg-white border p-4 flex-row justify-between"><span>🏪 {x.name}</span><b>{money(x.price)}</b></div>)}</div>
  </div>;
}
