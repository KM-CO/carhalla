"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./LoginPage.module.css";
import { doCredentialLogin } from "@/components/LoginFuncs";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message state

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null); // Clear any previous error message
    const form = new FormData(e.currentTarget);

    const response = await doCredentialLogin(form);

    if (response.error) {
      // Display error message from the response
      setErrorMessage(response.error);
    } else {
      // Redirect to home page on successful login
      router.push("/");
    }
  }

  return (
    <div className={styles.pageContainer}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2 className={styles.title}>Login</h2>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>} {/* Error message */}

        <div className={styles.inputGroup}>
          <label className={styles.label}>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Login
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
        <Link href="/signup">
          <button className={styles.linkButton}>{`Don't have an account? Sign Up`}</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
