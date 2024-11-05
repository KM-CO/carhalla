import { ReactNode } from "react";

interface ButtonProps {
    children?: ReactNode | undefined,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
} 

export default function Button({children, onClick}: ButtonProps) {
    return (
        <button onClick={onClick} className={`m-auto border-2 min-w-[75px] p-2 px-4 rounded-full hover:border-red-500 duration-300 bg-amber-300 hover:translate-y-[-2px]`}>{children}</button> 
    );
}