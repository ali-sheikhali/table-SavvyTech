"use client";

import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import type { ApiCoupon } from "@/types/CouponTypes";
import toast from "react-hot-toast";

interface CouponListProps {
  coupons: ApiCoupon[];
  onDelete?: (id: string) => void;
}

export default function CouponList({ coupons, onDelete }: CouponListProps) {
  const [open, setOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<ApiCoupon | null>(null);
  const [removeLoading, setRemoveLoading] = useState(false);

  const handleRemoveCoupon = async (id: string) => {
    setRemoveLoading(true);
    try {
      onDelete?.(id);
      toast.success("کوپن با موفقیت حذف شد.")
      setOpen(false);
    } finally {
      setRemoveLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto mt-3 p-2">
      <table className="min-w-full border border-gray-200 rounded-lg shadow-sm text-xs text-center">
        <thead className="bg-gray-100 text-gray-800">
          <tr>
            <th className="px-4 py-2">ردیف</th>
            <th className="px-4 py-2">کد تخفیف</th>
            <th className="px-4 py-2">نوع تخفیف</th>
            <th className="px-4 py-2">مقدار</th>
            <th className="px-4 py-2">حذف</th>
            <th className="px-4 py-2">ویرایش</th>
          </tr>
        </thead>

        <tbody>
          {coupons.map((coupon, index) => {
            const canDeleteCoupon = true;
            return (
              <tr key={coupon._id} className="border-t hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2 font-medium">{index + 1}</td>
                <td className="px-4 py-2 font-medium">{coupon.code}</td>
                <td className="px-4 py-2">{coupon.type === "percent" ? "درصدی" : "مبلغ ثابت"}</td>
                <td className="px-4 py-2">
                  {coupon.type === "percent"
                    ? `${coupon.value}%`
                    : `${coupon.value.toLocaleString()} تومان`}
                </td>

                {/* Delete */}
                <td className={`text-center ${canDeleteCoupon ? "text-red-500" : "text-gray-600"} font-medium`}>
                  <Dialog open={open && selectedCoupon?._id === coupon._id} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <button
                        disabled={!canDeleteCoupon}
                        onClick={() => {
                          setSelectedCoupon(coupon);
                          setOpen(true);
                        }}
                        className="hover:underline"
                      >
                        حذف
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>حذف کوپن</DialogTitle>
                      </DialogHeader>
                      <p>{`آیا مطمئن هستید که می‌خواهید کوپن "${coupon.code}" را حذف کنید؟`}</p>
                      <DialogFooter className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setOpen(false)}>انصراف</Button>
                        <Button
                          disabled={removeLoading}
                          variant="destructive"
                          onClick={() => selectedCoupon && handleRemoveCoupon(selectedCoupon._id)}
                        >
                          حذف
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </td>

                {/* Edit */}
                <td className="text-center text-yellow-600 hover:underline">
                  <Link href={`/coupon/edit/${coupon._id}`}>ویرایش</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {coupons.length === 0 && (
        <div className="text-center text-gray-500 py-6">هیچ کوپنی یافت نشد</div>
      )}
    </div>
  );
}
