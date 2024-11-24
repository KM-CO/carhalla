import Link from "next/link";
import Button from "./Button";
import styles from "./ViewEdit.module.css";
import { useSession } from "next-auth/react";

export default function ViewEdit({ id, owner }: {id: string, owner: string | undefined }) {
    const { data: session } = useSession();
    const isOwner = session ? session.user?.name === owner : false;
    return (
        <Link href={(isOwner ? `car` : `view`) + `/${id}`}>
            <Button className={isOwner ? styles.editButton : styles.viewButton}>{isOwner ? "Edit" : "View"}</Button>
        </Link>
    );
}