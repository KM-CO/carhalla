"use server";
import { auth } from "@/auth";
import HomeBody from "@/components/HomeBody";
import { SessionProvider } from "next-auth/react";

export default async function Home() {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <HomeBody />
    </SessionProvider>
  );
}
