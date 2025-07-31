import React from 'react'
import styles from "./Box.module.css"
interface BoxProps {
    children: React.ReactNode,
    className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
    return (
        <div
            className={styles.myclass}>
            {children}
        </div>
    )
}

export default Box