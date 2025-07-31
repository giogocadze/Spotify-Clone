"use client"
import styles from "./RightBar.module.css"
import React from 'react'
interface RighBarProps {
  children: React.ReactNode
}
const RighBar: React.FC<RighBarProps> = ({ children }) => {
  return (
    <div className={styles.rightbar}> {children}</div>
  )
}

export default RighBar