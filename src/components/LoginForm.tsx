"use client";

import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { useRouter } from "next/navigation";
import { doCredentialLogin } from "./LoginFuncs";


const LoginForm: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await doCredentialLogin(form);
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.title}>Login</h2>

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
  );
};

export default LoginForm;
