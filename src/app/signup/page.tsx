"use client";
import React from 'react';
import Link from 'next/link';
import styles from "./SignupPage.module.css";
import SignupForm from '@/components/SignupForm';

export default function Page() {

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>Create an Account</h2>
      <SignupForm />
      <div className={styles.linksContainer}>
        <Link href="/">
          <button className={styles.linkButton}>Go Back Home</button>
        </Link>
        <Link href="/login">
          <button className={styles.linkButton}>Already have an account? Log In</button>
        </Link>
      </div>
    </div>
  );
};
