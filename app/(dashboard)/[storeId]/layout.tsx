import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function dashboardLayout({
  children,
  params,
}: {
  children: React.JSX.Element;
  params: {
    storeId: string;
  };
}) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) redirect("/");

  return (
    <>
      <div>NAVBAR</div>
    </>
  );
}
