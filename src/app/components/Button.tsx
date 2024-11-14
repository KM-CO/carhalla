import { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
    children?: ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
}
/** NEED TO ALLOW CUSTOM CSS USING className FOR EACH BUTTON (Signup, Login, and Logout) */
export default function Button({ children, onClick, className }: ButtonProps) {
    return (
        <button onClick={onClick} className={`${styles.button} ${className}`}>
            {children}
        </button>
    );
}