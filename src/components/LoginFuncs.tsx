"use server";
import { signIn, signOut } from "@/auth";

export async function doLogout() {
    await signOut({ redirectTo: "/" });
}

// PROMISE MIGHT CAUSE ERRORS; I THINK IT IS OKAY, THOUGH
export async function doCredentialLogin(formData: FormData): Promise<{ id?: string; username?: string; email?: string; error?: string }> {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
        const response = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        // If response has an error, return it
        if (!response || response.error) {
            return { error: response.error || "Invalid login credentials. Please try again." };
        }

        return {
            id: response.id,
            username: response.username,
            email: response.email,
        };
    } catch (err) {
        // Handle unexpected errors
        console.error("Login error:", err); // Log the error for debugging
        return { error: "Invalid Username or Password. Please try again." };
    }
}