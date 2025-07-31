"use client";

import { useState } from "react";
import { addSongToPlaylist } from "@/actions/playlistSongs";

interface AddSongFormProps {
    playlistId: string;
}

export default function AddSongForm({ playlistId }: AddSongFormProps) {
    const [songId, setSongId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // You will probably want to fetch available songs from your API or pass them as props
    // Here, just assume you have a list of songs to choose from (static or fetched)
    const availableSongs = [
        { id: "song1", title: "Song 1" },
        { id: "song2", title: "Song 2" },
        // ... replace with your real songs
    ];

    async function handleAddSong() {
        if (!songId) return;
        setLoading(true);
        setError(null);

        try {
            await addSongToPlaylist(playlistId, songId);
            // Ideally, trigger a refresh of the playlist page or update UI state here
            alert("Song added!");
            setSongId(""); // reset select
        } catch (err: any) {
            setError(err.message || "Failed to add song");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <select
                value={songId}
                onChange={(e) => setSongId(e.target.value)}
                disabled={loading}
            >
                <option value="">Select a song to add</option>
                {availableSongs.map((song) => (
                    <option key={song.id} value={song.id}>
                        {song.title}
                    </option>
                ))}
            </select>
            <button onClick={handleAddSong} disabled={loading || !songId}>
                {loading ? "Adding..." : "Add Song"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
