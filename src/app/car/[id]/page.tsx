"use server";
import { auth } from "@/auth";
import Form from "@/components/Form"
import { SessionProvider } from "next-auth/react";

export default async function Page() {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <Form />
        </SessionProvider>
    );
}