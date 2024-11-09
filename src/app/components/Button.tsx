import { ReactNode } from "react";
import styles from './Button.module.css';

interface ButtonProps {
    children?: ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>
} 

export default function Button({children, onClick}: ButtonProps) {
    return (
        <button onClick={onClick} className={styles.button}>
            {children}
            </button> 
    );
}