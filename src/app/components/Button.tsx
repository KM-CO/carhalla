import { ReactNode } from "react";
import styles from './Button.module.css';

interface ButtonProps {
    children?: ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    onSubmit?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
} 

export default function Button({children, onClick, onSubmit, className }: ButtonProps) {
    return (
        <button 
        onClick={onClick} 
        onSubmit={onSubmit} 
        className={`${styles.button} ${className}`}>
            {children}
            </button> 
    );
}