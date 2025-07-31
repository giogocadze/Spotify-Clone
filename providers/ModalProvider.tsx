"use client"
import { useEffect, useState } from "react"
import Modal from "@/components/Modal/Modal"
import AuthModal from "@/components/authModal/authModal"
import ArtistModal from "@/components/ArtistModal/ArtistModal"
import SongModal from "@/components/SongModal/SongModal"

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null;
    }
    return (
        <>
            <AuthModal />
            <ArtistModal />
            <SongModal />
        </>
    )
}
export default ModalProvider;