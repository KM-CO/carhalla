import Link from "next/link";
import Button from "./Button";
import styles from "./Signup.module.css";

export default function Signup() {
    return (
        <Link href="/signup">
            <Button className={`${styles.button} ${styles.signupButton}`}> {/* Make this a signup button component using Button component */}
                Sign Up
            </Button>
        </Link>
    );
}