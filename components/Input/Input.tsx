import React, { forwardRef } from "react";
import styles from "./Input.module.css"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ type, disabled, className, ...props }, ref) => {
        return (
            <input
                type={type}
                disabled={disabled}
                ref={ref}
                className={`${styles.input} ${className}`} // manually merge styles
                {...props}
            />
        );
    }
);

Input.displayName = "Input";

export default Input;
