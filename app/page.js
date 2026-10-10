"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Skeleton from "@/components/Skeleton";
const Grid = ({ l }) => <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{l.map((p) => <ProductCard key={p.slug} p={p} />)}</div>;
export default function Home() {
  const [l, setL] = useState(null);
  useEffect(() => { getProducts().then(setL).catch(() => setL([])); }, []);
  const up = l?.filter((p) => p.change > 0).sort((a, b) => b.change - a.change).slice(0, 6);
  const dn = l?.filter((p) => p.change < 0).sort((a, b) => a.change - b.change).slice(0, 6);
  return <>
    <section className="grid md:grid-cols-2 items-center gap-6 py-10">
      <div><p className="text-green-700 font-semibold">আজকের বাজার</p>
        <h1 className="text-3xl md:text-5xl font-bold my-3">নিত্যপ্রয়োজনীয় পণ্যের দাম, এক নজরে</h1>
        <p className="text-gray-600 mb-5">চাল, ডাল, সবজি, মাছ-মাংস — সব পণ্যের আজকের দর ও দামের ওঠানামা জানুন।</p>
        <a href="#সব-পণ্য" className="btn btn-success text-white">সব পণ্য দেখুন</a></div>
      <Image src="/bazar-hero.png" alt="hero" width={480} height={400} priority className="mx-auto w-full max-w-md h-auto" />
    </section>
    {!l ? <Skeleton /> : <>
      <h2 className="text-2xl font-bold text-red-600 mb-4">আজ দাম বেড়েছে ▲</h2><Grid l={up} />
      <h2 className="text-2xl font-bold text-green-600 mt-10 mb-4">আজ দাম কমেছে ▼</h2><Grid l={dn} />
      <h2 id="সব-পণ্য" className="text-2xl font-bold mt-10 scroll-mt-32">সব পণ্য</h2><p className="text-gray-500 mb-4">সব পণ্যের আজকের বাজারদর</p><Grid l={l} /></>}
  </>;
}
