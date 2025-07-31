import Link from "next/link";
import styles from "./PlaylistClien.module.css";
import Header from "@/components/Header/Header";
import { Playlist } from "@/types";

interface PlaylistsClientProps {
  playlists: Playlist[];
}

export default function PlaylistsClient({ playlists }: PlaylistsClientProps) {
  return (
    <div>
      <Header>
        <h2 className="text-2xl font-bold text-white">Your Playlists</h2>
        <div className={styles.grid}>
          {playlists.length === 0 ? (
            <p className="text-white">No playlists yet.</p>
          ) : (
            playlists.map((p) => (
              <Link
                href={`/playlists/${p.id}`}
                key={p.id}
                className={styles.card}
              >
                <div className={styles.imageWrapper}>
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.title} />
                  ) : (
                    <img src="/default-playlist.png" alt="Default" />
                  )}
                </div>
                <div className={styles.title}>{p.title}</div>
              </Link>
            ))
          )}
        </div>
      </Header>
    </div>
  );
}
