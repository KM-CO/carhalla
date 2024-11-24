"use client";
import Link from "next/link";
import styles from "./Form.module.css";
import CloseButton from "@/components/CloseButton";
import LoadingDots from "./LoadingDots";

export default function Form() {
    /** TO DO
     * Make components and stuff for the follow
     * CSS
     * fix appearance when resizing
     */
    return (
        <div className={`gradient`}>
            <form className={styles.formContainer}>
                <Link href="/"><CloseButton /></Link>
                <div className={`${styles.imageContainer}`}>
                    <LoadingDots />
                </div>
                <div className={styles.formFieldsContainer}>
                    <div className={styles.inputFieldContainer}>
                        <input disabled className={styles.inputField} placeholder="Loading..." />
                    </div>
                    <div className={styles.inputFieldContainer}>
                        <input disabled className={styles.inputField} placeholder="Loading..." />
                    </div>
                    <div className={styles.inputFieldContainer}>
                        <input disabled className={styles.inputField} placeholder="Loading..." />
                    </div>
                    <div className={styles.inputFieldContainer}>
                        <input disabled className={styles.inputField} placeholder="Loading..." />
                    </div>
                    <div className={styles.inputFieldContainer}>
                        <textarea disabled rows={8} className={`${styles.inputField} ${styles.textareaField}`} placeholder="Loading..."/>
                    </div>
                </div>
            </form>
        </div>
    );
}
