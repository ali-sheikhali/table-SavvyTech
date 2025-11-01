import EditCouponClient from "@/components/EditCouponClient";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 
  console.log("idddd:", id);

  return <EditCouponClient id={id} />;
}