"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";

interface PlaylistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PlaylistModal: React.FC<PlaylistModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async () => {
        if (!name) return;
        setIsLoading(true);
        try {
            const res = await fetch("/api/playlists/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, description }),
            });

            if (!res.ok) throw new Error(await res.text());

            const newPlaylist = await res.json();

            // Redirect to the newly created playlist page
            router.push(`/playlist/${newPlaylist.id}`);

            // Optionally close the modal
            onClose();
        } catch (error) {
            console.error("Failed to create playlist:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onChange={(open) => {
                if (!open) onClose();
            }}
            title="Create Playlist"
            description="Fill in playlist details"
        >
            <div className="flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Playlist Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded"
                    disabled={isLoading}
                />
                <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 rounded"
                    disabled={isLoading}
                />
                <Button onClick={onSubmit} disabled={isLoading} className="w-full">
                    {isLoading ? "Creating..." : "Create"}
                </Button>
            </div>
        </Modal>
    );
};

export default PlaylistModal;
