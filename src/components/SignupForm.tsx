"use client";
import React, { useState } from "react";
import styles from "./SignupForm.module.css";
import { useRouter } from "next/navigation";

const SignupForm: React.FC = () => {

  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      setUsername("");
      setEmail("");
      setPassword("");

      router.push('/');
    } catch (error) {
      console.error('Error in creating user', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.formContainer}
    >
      <div className={styles.inputGroup}>
        <label
          htmlFor="username"
          className={styles.label}
        >
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
        <label
          htmlFor="email"
          className={styles.label}
        >
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
        <label
          htmlFor="password"
          className={styles.label}
        >
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
      <button
        type="submit"
        className={styles.submitButton}
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
