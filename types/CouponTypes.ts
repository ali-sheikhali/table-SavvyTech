export type CouponType = "percent" | "fixed";

export interface ApiCoupon {
  _id: string;
  code: string;
  type: CouponType;
  value: number; 
  usage_limit: number | null; 
  total_used: number; 
}
