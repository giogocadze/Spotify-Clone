import Link from 'next/link';
import React from 'react'
import styles from "./SideBar.module.css"
import { IconType } from 'react-icons';

interface SideBarItemProps {
    icon: IconType;
    label: string;
    active?: boolean;
    href: string;
}


const SideBarItem: React.FC<SideBarItemProps> = ({ icon: Icon, label, active, href }) => {
    return (
        <Link href={href} className={`${styles.link} ${active ? styles['link-active'] : ''}`}>
            <div className={`${styles['active-bar']} ${active ? styles['active-bar-active'] : ''}`} />
            {Icon && <Icon size={20} />}
            <p className={styles.sidebarlabel}>{label}</p>
        </Link>
    );


};


export default SideBarItem


