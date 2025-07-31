"use client";

import React, { useState } from "react";
import styles from "./AddSongToPlaylist.module.css"

interface AddSongToPlaylistProps {
    playlistId: string;
    songs: { id: string; title: string }[];
}

export default function AddSongToPlaylist({ playlistId, songs }: AddSongToPlaylistProps) {
    const [selectedSongId, setSelectedSongId] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: "error" | "success" } | null>(null);

    async function handleAddSong() {
        if (!selectedSongId) {
            setMessage({ text: "Please select a song.", type: "error" });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const res = await fetch("/api/playlistSongs/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ playlistId, songId: selectedSongId }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to add song.");
            }

            setMessage({ text: "Song added successfully!", type: "success" });
            setSelectedSongId("");
        } catch (error: any) {
            setMessage({ text: error.message || "Error adding song.", type: "error" });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <select
                className={styles.select}
                value={selectedSongId}
                onChange={(e) => setSelectedSongId(e.target.value)}
                disabled={loading}
            >
                <option value="">Select a song...</option>
                {songs.map((song) => (
                    <option key={song.id} value={song.id}>
                        {song.title}
                    </option>
                ))}
            </select>
            <button className={styles.button} onClick={handleAddSong} disabled={loading}>
                {loading ? "Adding..." : "Add Song"}
            </button>
            {message && (
                <p className={`${styles.message} ${message.type === "error" ? styles.error : styles.success}`}>
                    {message.text}
                </p>
            )}
        </div>
    );
}
