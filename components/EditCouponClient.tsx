"use client";

import { useMemo, useState } from "react";
import { useCoupons } from "@/hooks/useCoupons";
import type { ApiCoupon, CouponType } from "@/types/CouponTypes";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditCouponClient({ id }: { id: string }) {
  const router = useRouter();
  const { byId, update } = useCoupons();

  const normalizedId = useMemo(() => String(id), [id]);
  const found = byId(normalizedId);

  if (!found) {
    return <div className="w-10/12 mx-auto mt-10">کوپن یافت نشد</div>;
  }

  return (
    <EditCouponForm
      key={String(found._id)}
      coupon={found}
      onSubmit={(draft) => {
        update(found._id, draft);
        router.push("/");
      }}
    />
  );
}

function EditCouponForm({
  coupon,
  onSubmit,
}: {
  coupon: ApiCoupon;
  onSubmit: (data: ApiCoupon) => void;
}) {
  const [form, setForm] = useState<ApiCoupon>(() => ({ ...coupon }));
  const [error, setError] = useState<string | null>(null);

  const handleValueChange = (value: number) => {
    if (form.type === "percent" && (value < 0 || value > 100)) {
      setError("برای نوع درصدی، مقدار باید بین ۰ تا ۱۰۰ باشد");
    } else {
      setError(null);
      setForm((p) => ({ ...p, value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.type === "percent" && (form.value < 0 || form.value > 100)) {
      toast.error("برای نوع درصدی، مقدار باید بین ۰ تا ۱۰۰ باشد");
      return;
    }
    onSubmit(form);
    toast.success("کوپن با موفقیت ذخیره شد");
  };

  return (
    <form onSubmit={handleSubmit} className="w-10/12 mx-auto md:w-6/12 mt-10 space-y-4">
      <h2 className="text-xl font-bold">ویرایش کوپن</h2>

      <div className="space-y-1">
        <label className="block text-sm">کد</label>
        <input
          className="border rounded px-3 py-2 w-full"
          value={form.code}
          onChange={(e) => setForm((p) => ({ ...p, code: e.target.value }))}
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm">نوع</label>
        <select
          className="border rounded px-3 py-2 w-full"
          value={form.type}
          onChange={(e) =>
            setForm((p) => ({ ...p, type: e.target.value as CouponType }))
          }
        >
          <option value="percent">درصدی</option>
          <option value="fixed">مبلغ ثابت</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="block text-sm">
          مقدار {form.type === "percent" ? "(بین ۰ تا ۱۰۰)" : ""}
        </label>
        <input
          type="number"
          className={`border rounded px-3 py-2 w-full ${
            error ? "border-red-500" : ""
          }`}
          value={form.value}
          onChange={(e) => handleValueChange(Number(e.target.value))}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <button type="submit" className="bg-primary text-white px-4 py-2 rounded cursor-pointer">
        ذخیره
      </button>
    </form>
  );
}
