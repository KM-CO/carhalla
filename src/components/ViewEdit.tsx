"use client";
import Button from "./Button";
import styles from "./ViewEdit.module.css";
import { useSession } from "next-auth/react";

export default function ViewEdit({ owner }: { owner: string | undefined }) {
    const { data: session } = useSession();
    const isOwner = session ? session.user?.name === owner : false;
    return (
        <Button className={isOwner ? styles.editButton : styles.viewButton}>{isOwner ? "Edit" : "View"}</Button>
    );
}