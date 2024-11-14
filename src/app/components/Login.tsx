import Link from "next/link";
import Button from "./Button";
import styles from "./Login.module.css";

export default function Login() {
    return (
        <Link href="/login">
            <Button onClick={() => null} className={`${styles.button} ${styles.loginButton}`}>
                Login
            </Button>
        </Link>
    );
}