
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password });
  };

  return (
    <div className={styles.pageContainer}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2 className={styles.title}>Login</h2>
        
        <div className={styles.inputGroup}>
          <label className={styles.label}>Username:</label>
          <input
            type="text"
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
