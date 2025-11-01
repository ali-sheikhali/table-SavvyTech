import CouponTableClient from "@/components/CouponTableClient";
import Link from "next/link";

export default function Home() {
  return (
    <section>
      <div className="flex flex-col gap-5 w-10/12 mx-auto mt-10">
        <h1 className="font-bold text-2xl text-center">Table Task</h1>
        <div className="w-full flex justify-end">
          <Link
            className="bg-primary py-2 px-3 rounded-md w-fit text-white flex justify-center items-center"
            href="/coupon/new-coupon"
          >
            کوپن جدید
          </Link>
        </div>

        <CouponTableClient />
      </div>
    </section>
  );
}