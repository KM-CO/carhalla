"use client";
import React from "react";
import Link from "next/link";
import SignupForm from "../components/SignupForm";
import styles from "./SignupPage.module.css"; 

const SignupPage: React.FC = () => {
  const handleSignup = (credentials: { username: string; email: string; password: string }) => {
    console.log("Signup with:", credentials);
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>Create an Account</h2>
      <SignupForm onSignup={handleSignup} />
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

export default SignupPage;
