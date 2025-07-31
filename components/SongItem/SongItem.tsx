"use client"

import useLoadArtistImage from '@/hooks/useLoadArtistsImage copy'
import useLoadSongImage from '@/hooks/useLoadSongImage'
import { Artist, Song } from '@/types'
import style from "./SongItem.module.css"
import React from 'react'
import Image from 'next/image'
import PlayButton from '../PlayButton/PlayButton'

interface SongItemProps {
    data: Song
    artist: Artist
    onClick: (id: string) => void
    playlistId?: string // optional – show button only if provided
}

const SongItem: React.FC<SongItemProps> = ({ data, artist, onClick, playlistId }) => {
    const songImagePath = useLoadSongImage(data)
    const artistImagePath = useLoadArtistImage(artist)

    const handleAddToPlaylist = async () => {
        if (!playlistId) {
            alert("No playlist selected.")
            return
        }

        try {
            const res = await fetch('/api/playlistSongs/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ playlistId, songId: data.id }),
            })

            const result = await res.json()

            if (!res.ok) {
                throw new Error(result.error || 'Unknown error')
            }

            alert('✅ Song added to playlist!')
        } catch (error) {
            console.error(error)
            alert('❌ Failed to add song to playlist.')
        }
    }

    return (
        <div className={style.container}>
            <div className={style.content}>
                <Image
                    className={style.photo}
                    fill
                    src={songImagePath || "/img/song.jpg"}
                    alt={data.title}
                />
            </div>

            <div className={style.textWrapper}>
                <p className={style.paraghrap}>{data.title}</p>
                <div className={style.artist}>
                    <div className={style.avatarBox}>
                        <Image
                            alt={artist.author}
                            src={artistImagePath || "/img/user.png"}
                            fill
                            className={style.avatarImage}
                        />
                    </div>
                    <p className={style.paraghrapp}>{artist.author}</p>
                </div>
            </div>

            <div className={style.element}>
                <PlayButton onClick={() => onClick(data.id)} />
                {playlistId && (
                    <button onClick={handleAddToPlaylist} className={style.addButton}>
                        ➕
                    </button>
                )}
            </div>
        </div>
    )
}

export default SongItem
