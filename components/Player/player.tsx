"use client"
import useGetSongById from '@/hooks/useGetSongById';
import useLoadSong from '@/hooks/useLoadSong';
import usePlayer from '@/hooks/usePlayer'
import React from 'react'
import styles from "./player.module.css"
import PlayerContent from '../PlayerContent/PlayerContent';
const player = () => {
    const player = usePlayer();
    const { song } = useGetSongById(player.activeId)

    const songUrl = useLoadSong(song!)

    if (!song || !songUrl || !player.activeId) {
        return null
    }
    return (
        <div className={styles.fixedBottomBar}>
            <PlayerContent
                song={song}
                songUrl={songUrl}
                key={songUrl}
            />
        </div>
    )
};

export default player
