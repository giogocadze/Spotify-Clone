"use client"
import Modal from "../Modal/Modal"
import React, { useEffect, useState } from 'react'
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import useAuthModal from "@/hooks/useAuthModal"

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModal();

    const [hasHandledLogin, setHasHandledLogin] = useState(false); // 🛑 To prevent infinite loop

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    useEffect(() => {
        if (session && isOpen && !hasHandledLogin) {
            setHasHandledLogin(true);
            onClose();
            setTimeout(() => {
                router.refresh(); // Delay helps avoid re-render race
            }, 300);
        }
    }, [session, isOpen, hasHandledLogin, onClose, router]);

    return (
        <Modal
            title="Welcome Back"
            description="Authenticate Yourself using the following providers"
            isOpen={isOpen}
            onChange={onChange}
        >
            <Auth
                supabaseClient={supabaseClient}
                theme="dark"
                providers={["github", "google"]}
                magicLink
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: "#404040",
                                brandAccent: "#22c55e"
                            }
                        }
                    }
                }}
            />
        </Modal>
    )
}

export default AuthModal;
