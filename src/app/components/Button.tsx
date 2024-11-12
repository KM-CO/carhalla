import { FormEventHandler, ReactNode } from "react";
import styles from './Button.module.css';

interface ButtonProps {
    children?: ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    onSubmit?: FormEventHandler<HTMLButtonElement>;
    className?: string;
} 
/** NEED TO ALLOW CUSTOM CSS USING className FOR EACH BUTTON (Signup, Login, and Logout) */
export default function Button({children, onClick, onSubmit}: ButtonProps) {
    return (
        <button onClick={onClick} onSubmit={onSubmit} className={styles.button}>
            {children}
            </button> 
    );
}