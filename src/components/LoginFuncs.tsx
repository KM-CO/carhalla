"use server";
import { signIn, signOut } from "@/auth";

export async function doLogout() {
    await signOut({ redirectTo: "/" });
}

// PROMISE MIGHT CAUSE ERRORS; I THINK IT IS OKAY, THOUGH
export async function doCredentialLogin(formData: FormData): Promise<{ id: string, username: string, email: string }> {
    const username = formData.get("username") as string;
    console.log(username);
    const password = formData.get("password") as string;

    try {
        const response = await signIn("credentials", {
            username, password, redirect: false,
        });
        console.log(response);
        return response;
    } catch (err) {
        throw err;
    }
}