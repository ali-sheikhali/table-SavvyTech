// lib/couponStorage.ts
import type { ApiCoupon } from "@/types/CouponTypes";
import { coupons as seedCoupons } from "@/lib/coupons";

const STORAGE_KEY = "coupons";

export function readCoupons(): ApiCoupon[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedCoupons));
    return seedCoupons;
  }
  try {
    return JSON.parse(raw) as ApiCoupon[];
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedCoupons));
    return seedCoupons;
  }
}

export function writeCoupons(next: ApiCoupon[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
