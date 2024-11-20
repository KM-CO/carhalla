"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./SignupPage.module.css";

export default function Page() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const response = await fetch(`/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong");
      }

      setUsername("");
      setEmail("");
      setPassword("");

      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        console.error("Error in creating user:", error.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
        console.error("Error in creating user:", error);
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>Create an Account</h2>
      <form onSubmit={handleSignup} className={styles.formContainer}>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <div className={styles.inputGroup}>
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Sign Up
        </button>
      </form>
      <div className={styles.linksContainer}>
        <Link href="/">
          <button className={styles.iconButton}>
          <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className={styles.houseIcon}
          >
            <path d="M12 3l9 8.5V20a1 1 0 0 1-1 1h-6v-6H10v6H4a1 1 0 0 1-1-1v-8.5L12 3zm0-2L2 9.5V20a3 3 0 0 0 3 3h6v-6h2v6h6a3 3 0 0 0 3-3V9.5L12 1z" />
            </svg>
          </button>
        </Link>
        <Link href="/login">
          <button className={styles.linkButton}>{`Already have an account? Log In`}</button>
        </Link>
      </div>
    </div>
  );
}
