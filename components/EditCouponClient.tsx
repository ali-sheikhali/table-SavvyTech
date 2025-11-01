"use client";

import { useMemo, useState } from "react";
import { useCoupons } from "@/hooks/useCoupons";
import type { ApiCoupon, CouponType } from "@/types/CouponTypes";
import { useRouter } from "next/navigation";

export default function EditCouponClient({ id }: { id: string }) {
  const router = useRouter();
  const { byId, update } = useCoupons();

  // نرمال‌سازی آیدی برای جلوگیری از ناسازگاری عدد/رشته
  const normalizedId = useMemo(() => String(id), [id]);

  // کوپن موردنظر از استیت هوک (synchronous)
  const found = byId(normalizedId);

  // اگر کوپنی پیدا نشد
  if (!found) {
    return (
      <div className="w-10/12 mx-auto mt-10">
        کوپن یافت نشد
        <div className="text-xs text-zinc-500 mt-2 ltr">Debug: id = {normalizedId}</div>
      </div>
    );
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
  // state اولیه فقط یک‌بار از روی props ساخته می‌شود؛ نیازی به useEffect نیست
  const [form, setForm] = useState<ApiCoupon>(() => ({ ...coupon }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="w-10/12 mx-auto mt-10 space-y-4">
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
        <label className="block text-sm">مقدار</label>
        <input
          type="number"
          className="border rounded px-3 py-2 w-full"
          value={form.value}
          onChange={(e) => setForm((p) => ({ ...p, value: Number(e.target.value) }))}
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm">سقف استفاده (اختیاری)</label>
        <input
          type="number"
          className="border rounded px-3 py-2 w-full"
          value={form.usage_limit ?? ""}
          onChange={(e) =>
            setForm((p) => ({
              ...p,
              usage_limit: e.target.value === "" ? null : Number(e.target.value),
            }))
          }
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm">تعداد استفاده‌شده</label>
        <input
          type="number"
          className="border rounded px-3 py-2 w-full"
          value={form.total_used}
          onChange={(e) =>
            setForm((p) => ({ ...p, total_used: Number(e.target.value) }))
          }
        />
      </div>

      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
        ذخیره
      </button>
    </form>
  );
}
