"use server";
import { auth } from "@/auth";
import Form from "@/components/Form";
import { SessionProvider } from "next-auth/react";

export default async function Page() {
    /* WE NEED TO MAKE FORM HAVE AN AUTHENTICATED VIEW SO WE CAN REPLACE THIS */
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <Form readOnly />
        </SessionProvider>
    );
}