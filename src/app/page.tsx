"use server";
import { auth } from "@/auth";
import Header from "../components/Header";
import HomeBody from "@/components/HomeBody";
import { SessionProvider } from "next-auth/react";

export default async function Home() {

  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="grid grid-rows-[min-content] h-full">
        <Header />
        <HomeBody />
      </div>
    </SessionProvider>
  );
}
