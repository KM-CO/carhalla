"use client";
import styles from "./CloseButton.module.css"

interface CloseButtonProps {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    className?: string;
}

export default function CloseButton({ onClick, className }: CloseButtonProps) {
    return (
        <div className={`${styles.link} ${className}`} onClick={onClick}></div>
    );
}