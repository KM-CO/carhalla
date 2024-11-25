"use client";
import Link from "next/link";
import favicon from "@/app/favicon.ico";
import styles from "./Title.module.css"
import Image from "next/image";

const Title: React.FC = () => {
    const title = "Carhalla";
    return (
        <Link href="/" className={styles.titleContainer}>
            <Image height={37} width={37} src={favicon} alt={"Carhalla icon"} />
            <h1 className={styles.title}>
                {title.split('').map((letter, index) => (
                    <span key={index} className={styles.letter}>
                        {letter}
                    </span>
                ))}
            </h1>
        </Link>
    );
};
export default Title;