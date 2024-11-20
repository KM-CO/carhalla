"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './LoginPage.module.css';
import { doCredentialLogin } from "@/components/LoginFuncs";
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const response = await doCredentialLogin(form);
    // HANDLE RESPONSE TO SAY IF LOGIN WAS GOOD; CHECK LOGINFUNCS AND ADD ERROR HANDLING
    console.log(response);
    router.push("/");
  };

  return (
    <div className={styles.pageContainer}>
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

        <button
          type="submit"
          className={styles.submitButton}
        >
          Login
        </button>
      </form>


      <div className={styles.linksContainer}>
        <Link href="/">
          <button className={styles.linkButton}>Go Back Home</button>
        </Link>
        <Link href="/signup">
          <button className={styles.linkButton}>{`Don't have an account? Sign Up`}</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
