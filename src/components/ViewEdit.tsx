import Link from "next/link";
import Button from "./Button";
import styles from "./ViewEdit.module.css";
import { useSession } from "next-auth/react";

export default function ViewEdit({ id, owner }: {id: string, owner: string | undefined }) {
    const isOwner = useSession().data?.user?.name as string === owner;
    return (
        <Link href={(isOwner ? `car` : `view`) + `/${id}`}>
            <Button className={isOwner ? styles.editButton : styles.viewButton}>{isOwner ? "Edit" : "View"}</Button>
        </Link>
    );
}