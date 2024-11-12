import { FormEventHandler, ReactNode } from "react";
import styles from './Button.module.css';

interface ButtonProps {
    children?: ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    onSubmit?: FormEventHandler<HTMLButtonElement>;
    className?: string;
} 

export default function Button({children, onClick, onSubmit, className}: ButtonProps) {
    return (
        <button onClick={onClick} onSubmit={onSubmit} className={className}>
            {children}
            </button> 
    );
}