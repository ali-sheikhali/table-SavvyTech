// hooks/useCoupons.ts
"use client";

import { useCallback, useMemo, useState } from "react";
import type { ApiCoupon } from "@/types/CouponTypes";
import { readCoupons, writeCoupons } from "@/lib/couponStorage";

export function useCoupons() {
  // ✅ Load once on first render (client), no useEffect
  const [coupons, setCoupons] = useState<ApiCoupon[]>(() => readCoupons());

  const persist = useCallback((next: ApiCoupon[]) => {
    setCoupons(next);
    writeCoupons(next);
  }, []);

  const create = useCallback((coupon: ApiCoupon) => {
    persist([coupon, ...coupons]);
  }, [coupons, persist]);

  const update = useCallback((id: string, patch: Partial<ApiCoupon>) => {
    persist(coupons.map(c => (c._id === id ? { ...c, ...patch } : c)));
  }, [coupons, persist]);

  const remove = useCallback((id: string) => {
    persist(coupons.filter(c => c._id !== id));
  }, [coupons, persist]);

  const byId = useCallback((id: string) => {
    return coupons.find(c => c._id === id) || null;
  }, [coupons]);

  return useMemo(
    () => ({ coupons, create, update, remove, byId, setCoupons: persist }),
    [coupons, create, update, remove, byId, persist]
  );
}
