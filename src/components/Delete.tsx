import Link from "next/link";
import Button from "./Button";
import styles from "./Delete.module.css";

interface DeleteProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Delete({ onClick }: DeleteProps) {
    return (
        <Link href="/">
            <Button onClick={onClick} className={`${styles.deleteButton}`} >Delete</Button>
        </Link>
    );
}