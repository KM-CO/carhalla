import Link from "next/link";
import Button from "./Button";
import styles from "./View.module.css";

export default function View({ id }: {id: string }) {
    return (
        <Link href={`view/${id}`}><Button className={styles.viewButton}>View</Button></Link>
    );
}