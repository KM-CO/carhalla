"use client";
import { useState } from "react";
import styles from "./Hamburger.module.css";
import CloseButton from "./CloseButton";

const Hamburger: React.FC = () => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => {
        setOpen(!open);
    }
    return (
        <>
            {open ? <CloseButton onClick={toggleOpen} className={styles.close} /> :
                <div className={styles.hamburger} onClick={toggleOpen} >
                    <div className={styles.patty}></div>
                    <div className={styles.patty}></div>
                    <div className={styles.patty}></div>
                </div >
            }
        </>
    );
};
export default Hamburger;