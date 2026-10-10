"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProducts, getJSON } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Skeleton from "@/components/Skeleton";
export default function Category() {
  const { slug } = useParams();
  const [l, setL] = useState(null), [cat, setCat] = useState(null), [sort, setSort] = useState("d");
  useEffect(() => { setL(null); getProducts(`?category=${slug}`).then(setL).catch(() => setL([])); getJSON(`/categories/${slug}`).then(setCat).catch(() => {}); }, [slug]);
  const s = l && [...l].sort((a, b) => sort === "a" ? a.price - b.price : sort === "z" ? b.price - a.price : 0);
  return <div className="py-8">
    <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
      <h1 className="text-3xl font-bold">{cat?.icon || cat?.emoji || l?.[0]?.categoryIcon} {cat?.name || cat?.nameBn || l?.[0]?.categoryNameBn || slug}</h1>
      <label className="flex items-center gap-2">সাজান:
        <select className="select select-bordered select-sm" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="d">ডিফল্ট</option><option value="a">দাম: কম থেকে বেশি</option><option value="z">দাম: বেশি থেকে কম</option></select></label></div>
    {!s ? <Skeleton /> : s.length === 0 ? <div className="text-center py-20"><p className="text-5xl">🫙</p><p className="text-xl my-3">৪০৪ — এই ক্যাটাগরিতে কোনো পণ্য নেই</p><Link href="/" className="btn btn-success text-white">হোম পেজে ফিরে যান</Link></div>
      : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{s.map((p) => <ProductCard key={p.slug} p={p} />)}</div>}
  </div>;
}
