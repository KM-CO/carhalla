"use client";
import styles from "./LoadingDots.module.css";

export default function LoadingDots() {
    return (<div className={styles.loading}><div className={styles.loading1}>.</div><div className={styles.loading2}>.</div><div className={styles.loading3}>.</div></div>);
}