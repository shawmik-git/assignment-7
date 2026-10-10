"use client";
import { useEffect, useState } from "react";
import { getProducts, money } from "@/lib/api";
export default function Ticker() {
  const [l, setL] = useState([]);
  useEffect(() => { getProducts().then(setL).catch(() => {}); }, []);
  const row = l.map((p) => <span key={p.slug} className="mx-6 whitespace-nowrap">{p.emoji} {p.name} {money(p.price)}/{p.unit.replace("প্রতি ", "")} <b className={p.change >= 0 ? "text-green-600" : "text-red-600"}>{p.change >= 0 ? "▲" : "▼"} {Math.abs(p.change)}%</b></span>);
  return <div className="bg-amber-50 border-b overflow-hidden text-sm py-1.5"><div className="flex w-max animate-[marq_40s_linear_infinite]">{row}{row}</div>
    <style>{`@keyframes marq{to{transform:translateX(-50%)}}`}</style></div>;
}
