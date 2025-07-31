// app/playlist/[id]/page.tsx
import { notFound } from "next/navigation";
import { getPlaylistById } from "@/actions/playlist";
import { getSongsInPlaylist } from "@/actions/playlistSongs";
import styles from "./page.module.css";
import Header from "@/components/Header/Header";

interface PlaylistPageProps {
    params: {
        id: string;
    };
}

export default async function PlaylistPage({ params }: PlaylistPageProps) {
    const playlist = await getPlaylistById(params.id);

    if (!playlist) {
        return notFound();
    }

    const songs = await getSongsInPlaylist(params.id);

    return (
        <div>
            <Header>
                <div className={styles.container}>
                    <div className={styles.header}>
                        {playlist.image_url ? (
                            <img
                                src={playlist.image_url}
                                alt={playlist.title || "Playlist Cover"}
                                className={styles.cover}
                            />
                        ) : (
                            <div className={styles.noImage}>No Image</div>
                        )}
                        <div>
                            <h1 className={styles.title}>{playlist.title}</h1>
                            <p className={styles.description}>
                                {playlist.description || "No description."}
                            </p>
                        </div>
                    </div>
                    {/* Songs list */}

                </div>
            </Header>
            <div className={styles.songsList}>
                {songs.length === 0 ? (
                    <p className={styles.noSongs}>No songs in this playlist.</p>
                ) : (
                    songs.map((song) => (
                        <div key={song.id} className={styles.songItem}>
                            <img
                                src={song.image_uri || "/default-song.png"}
                                alt={song.title}
                                className={styles.songImage}
                            />
                            <div className={styles.songDetails}>
                                <p className={styles.songTitle}>{song.title}</p>
                                <p className={styles.songArtist}>{song.artist?.author || 'Unknown Artist'}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
