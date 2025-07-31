"use client"
import { Artist, Song } from '@/types'
import React from 'react'
import styles from "./PageContent.module.css"
import SongItem from '@/components/SongItem/SongItem'
import useOnPlay from '@/hooks/useOnPlay'

interface PageContentProps {
    songs: Song[]
    artists: Artist[]
}

const PageContent: React.FC<PageContentProps> = ({ songs, artists,}) => {
    const onPlay = useOnPlay(songs)

    if (songs?.length === 0) {
        return <div className={styles.paraghrap}>No Artists Data Available</div>
    }

    return (
        <div className={styles.container}>
            {songs.map(item => (
                <SongItem
                    key={item.id}
                    data={item}
                    artist={artists.find((artist) => artist.id === item.artist_id)!}
                    onClick={(id: string) => onPlay(id)}
                />
            ))}
        </div>
    )
}

export default PageContent
