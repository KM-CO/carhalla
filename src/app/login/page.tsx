"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './LoginPage.module.css';
import LoginForm from '@/components/LoginForm';

const Page = () => {
  return (
    <div className={styles.pageContainer}>
      <LoginForm />
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

export default Page;
