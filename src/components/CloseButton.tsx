import styles from "./CloseButton.module.css"

interface CloseButtonProps {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function CloseButton({ onClick }: CloseButtonProps) {
    return (
        <div className={styles.link} onClick={onClick}></div>
    );
}