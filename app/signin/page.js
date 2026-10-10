"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";
function Form() {
  const r = useRouter(), sp = useSearchParams(), [busy, setBusy] = useState(false);
  useEffect(() => { if (sp.get("denied")) toast.error("এই পাতা দেখতে আগে সাইন ইন করুন", { id: "d" }); }, [sp]);
  const submit = async (e) => {
    e.preventDefault(); const f = new FormData(e.target); setBusy(true);
    const { error } = await authClient.signIn.email({ email: f.get("email"), password: f.get("password") });
    setBusy(false);
    if (error) return toast.error(error.message || "লগইন ব্যর্থ হয়েছে");
    toast.success("সফলভাবে সাইন ইন হয়েছে"); r.push(sp.get("from") || "/");
  };
  return <form onSubmit={submit} className="card bg-white border p-6 max-w-md mx-auto my-12 space-y-3">
    <h1 className="text-2xl font-bold">সাইন ইন</h1>
    <input name="email" type="email" required placeholder="ইমেইল" className="input input-bordered w-full" />
    <input name="password" type="password" required placeholder="পাসওয়ার্ড" className="input input-bordered w-full" />
    <button disabled={busy} className="btn btn-success text-white w-full">{busy ? "অপেক্ষা করুন..." : "সাইন ইন"}</button>
    <SocialButtons /><p className="text-sm text-center">অ্যাকাউন্ট নেই? <Link href="/signup" className="link link-success">সাইন আপ</Link></p></form>;
}
export default function Page() { return <Suspense><Form /></Suspense>; }
