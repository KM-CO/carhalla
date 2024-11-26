"use client";
import Link from "next/link";
import Button from "./Button";
import styles from "./Signup.module.css";

export default function Signup() {
    return (
        <Link href="/signup">
            <Button className={`${styles.signupButton}`}> 
                Sign Up
            </Button>
        </Link>
    );
}