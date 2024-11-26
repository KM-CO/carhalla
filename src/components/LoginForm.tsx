
"use client";
import React, { useEffect, useState } from "react";
import styles from "./LoginSignupForms.module.css";
import { useRouter } from "next/navigation";
import { doCredentialLogin } from "./LoginFuncs";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

 
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prefilledUsername = params.get("username");
    if (prefilledUsername) {
      setUsername(prefilledUsername);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    const form = new FormData(e.currentTarget);

    const response = await doCredentialLogin(form);

    if (response.error) {
      setErrorMessage(response.error);
    } else {
      router.push("/");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.title}>Login</h2>

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

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

      <button type="submit" className={styles.loginButton}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
