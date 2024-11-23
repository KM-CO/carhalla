"use client";
import React from "react";
import Link from "next/link";
import styles from "./SignupPage.module.css";
import SignupForm from "@/components/SignupForm";
import HomeButton from "@/components/HomeButton";

export default function Page() {

  return (
    <div className={`${styles.pageContainer} gradient`}>
      <SignupForm />
      <div className={styles.linksContainer}>
        <HomeButton />
        <Link href="/login">
          <button className={styles.signupButton}>Already have an account? Log In</button>
        </Link>
      </div>
    </div>
  );
}
