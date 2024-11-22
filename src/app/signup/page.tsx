"use client";
import React from "react";
import Link from "next/link";
import styles from "./SignupPage.module.css";
import SignupForm from "@/components/SignupForm";

export default function Page() {

  return (
    <div className={styles.pageContainer}>
      <SignupForm />
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
          <button className={styles.linkButton}>Already have an account? Log In</button>
        </Link>
      </div>
    </div>
  );
}
