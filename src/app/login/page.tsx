"use client";
import React from "react";
import Link from "next/link";
import styles from "./LoginPage.module.css";
import LoginForm from "@/components/LoginForm";
import HomeButton from "@/components/HomeButton";

const Page = () => {

  return (
    <div className={`${styles.pageContainer} gradient`}>
      <LoginForm />
      <div className={styles.linksContainer}>
        <HomeButton />
        <Link href="/signup">
          <button className={styles.linkButton}>{`Don't have an account? Sign Up`}</button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
