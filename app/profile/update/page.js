"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function Update() {
  const r = useRouter(), { data } = authClient.useSession();
  const submit = async (e) => {
    e.preventDefault(); const name = new FormData(e.target).get("name").trim();
    if (!name) return toast.error("নাম দিন");
    const { error } = await authClient.updateUser({ name });
    if (error) return toast.error(error.message || "আপডেট ব্যর্থ");
    toast.success("তথ্য আপডেট হয়েছে"); r.push("/profile");
  };
  return <form onSubmit={submit} className="card bg-white border p-6 max-w-md mx-auto my-12 space-y-3">
    <h1 className="text-2xl font-bold">তথ্য আপডেট</h1>
    <input key={data?.user?.name} name="name" defaultValue={data?.user?.name} placeholder="নাম" className="input input-bordered w-full" />
    <button className="btn btn-success text-white w-full">আপডেট করুন</button></form>;
}
