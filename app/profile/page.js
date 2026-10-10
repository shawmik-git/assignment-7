"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
export default function Profile() {
  const { data, isPending } = authClient.useSession();
  if (isPending) return <div className="skeleton h-48 max-w-md mx-auto my-12" />;
  const u = data?.user;
  return <div className="card bg-white border p-6 max-w-md mx-auto my-12 items-center text-center gap-2">
    {u?.image ? <img src={u.image} alt="" className="w-24 h-24 rounded-full" /> : <div className="text-6xl">👤</div>}
    <h1 className="text-2xl font-bold">{u?.name}</h1><p className="text-gray-600">{u?.email}</p>
    <Link href="/profile/update" className="btn btn-success text-white mt-3">তথ্য আপডেট করুন</Link></div>;
}
