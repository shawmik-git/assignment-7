"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { bn, getJSON } from "@/lib/api";
export default function Navbar() {
  const path = usePathname(), router = useRouter();
  const { data } = authClient.useSession();
  const [cats, setCats] = useState([]);
  useEffect(() => { getJSON("/categories").then((c) => setCats(Array.isArray(c) ? c : [])).catch(() => {}); }, []);
  const date = new Date().toLocaleDateString("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const out = async () => { await authClient.signOut(); toast.success("সাইন আউট হয়েছে"); router.push("/"); };
  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2"><Image src="/logo-icon.png" alt="logo" width={32} height={32} />
          <div><p className="font-bold text-lg leading-none">🛒 বাজার দর</p><p className="text-xs text-gray-500">{date}</p></div></Link>
        <div className="flex gap-2 items-center">
          {data ? <><Link href="/profile" className="btn btn-sm sm:btn-md btn-ghost">{data.user.name}</Link><button onClick={out} className="btn btn-sm sm:btn-md btn-outline">সাইন আউট</button></>
            : <><Link href="/signin" className="btn btn-sm sm:btn-md btn-ghost">সাইন ইন</Link><Link href="/signup" className="btn btn-sm sm:btn-md btn-success text-white">সাইন আপ</Link></>}
        </div>
        <nav className="w-full flex gap-2 overflow-x-auto pb-1 md:justify-center">
          <Link href="/" className={`btn btn-sm ${path === "/" ? "btn-success text-white" : "btn-ghost"}`}>হোম</Link>
          {cats.map((c) => { const s = c.slug || c.id; return <Link key={s} href={`/category/${s}`} className={`btn btn-sm whitespace-nowrap ${path === `/category/${s}` ? "btn-success text-white" : "btn-ghost"}`}>{c.icon || c.emoji} {c.name || c.nameBn}</Link>; })}
        </nav>
      </div>
    </header>
  );
}
