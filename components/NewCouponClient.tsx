"use client";

import { useState } from "react";
import { useCoupons } from "@/hooks/useCoupons";
import type { ApiCoupon, CouponType } from "@/types/CouponTypes";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NewCouponClient() {
  const router = useRouter();
  const { create } = useCoupons();
  const [form, setForm] = useState<ApiCoupon>({
    _id: crypto.randomUUID(),
    code: "",
    type: "percent",
    value: 10,
    usage_limit: null,
    total_used: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    create(form);
    toast.success("کوپن با موفقیت ثبت شد.")
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="w-10/12 mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold">کوپن جدید</h2>

      <div className="space-y-1">
        <label className="block text-sm">کد</label>
        <input
          className="border rounded px-3 py-2 w-full"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm">نوع</label>
        <select
          className="border rounded px-3 py-2 w-full"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value as CouponType })}
        >
          <option value="percent">درصدی</option>
          <option value="fixed">مبلغ ثابت</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="block text-sm">مقدار</label>
        <input
          type="number"
          className="border rounded px-3 py-2 w-full"
          value={form.value}
          onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
        />
      </div>

      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
        ذخیره
      </button>
    </form>
  );
}
