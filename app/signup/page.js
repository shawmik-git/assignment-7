"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";
export default function SignUp() {
  const r = useRouter(), [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault(); const f = new FormData(e.target);
    if (f.get("password").length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    setBusy(true);
    const { error } = await authClient.signUp.email({ name: f.get("name"), email: f.get("email"), password: f.get("password") });
    setBusy(false);
    if (error) return toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
    await authClient.signOut(); toast.success("রেজিস্ট্রেশন সফল! এবার সাইন ইন করুন"); r.push("/signin");
  };
  return <form onSubmit={submit} className="card bg-white border p-6 max-w-md mx-auto my-12 space-y-3">
    <h1 className="text-2xl font-bold">সাইন আপ</h1>
    <input name="name" required placeholder="নাম" className="input input-bordered w-full" />
    <input name="email" type="email" required placeholder="ইমেইল" className="input input-bordered w-full" />
    <input name="password" type="password" required placeholder="পাসওয়ার্ড (কমপক্ষে ৮ অক্ষর)" className="input input-bordered w-full" />
    <button disabled={busy} className="btn btn-success text-white w-full">{busy ? "অপেক্ষা করুন..." : "রেজিস্টার"}</button>
    <SocialButtons /><p className="text-sm text-center">অ্যাকাউন্ট আছে? <Link href="/signin" className="link link-success">সাইন ইন</Link></p></form>;
}
