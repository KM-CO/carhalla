import Link from "next/link";
import Button from "./Button";
import styles from "./Cancel.module.css";

export default function Cancel() {
    return (
        <Link href="/"><Button className={`${styles.cancelButton}`}>Cancel</Button></Link>
    );
}