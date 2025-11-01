"use client";

import CouponList from "@/components/CouponList";
import { useCoupons } from "@/hooks/useCoupons";

export default function CouponTableClient() {
  const { coupons, remove } = useCoupons();

  return (
    <CouponList
      coupons={coupons}
      onDelete={remove}
    />
  );
}
