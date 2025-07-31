import React, { forwardRef } from 'react'
import styles from "./Button.module.css"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
        <button
            type={type}
            className={`${styles.fullbutton} ${className}`} // Manually merge class names
            disabled={disabled}
            ref={ref}
            {...props}
        >
            {children}
        </button>
    )
})

Button.displayName = "Button"

export default Button;
