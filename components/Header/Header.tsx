"use client";

import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa6";
import styles from "./Header.module.css";
import Button from "../Button/Button";
import { FaChevronRight } from "react-icons/fa";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
    const router = useRouter();
    return (
        <div className={`${styles.headerContainer} ${className || ""}`}>
            <div className={styles.headerInner}>
                <div className={styles.backButtonWrapper}>
                    <Button className={styles.backButton} onClick={() =>
                        router.back()} >
                        <FaChevronLeft className={styles.backIcon} />
                    </Button>
                    <Button className={styles.backButton} onClick={() =>
                        router.forward()} >
                        <FaChevronRight className={styles.backIcon} />
                    </Button>
                </div>
            </div>
            {children}
        </div>
    );
};

export default Header;
