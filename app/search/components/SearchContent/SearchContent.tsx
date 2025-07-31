"use client"

import { Artist, Song } from '@/types'
import React from 'react'
import styles from "./SearchContent.module.css"
import MediaItem from '@/components/MediaItem/MediaItem'
import useOnPlay from '@/hooks/useOnPlay'
interface SearchContentProps {
    songs: Song[],
    artists: Artist[]
}
const SearchContent: React.FC<SearchContentProps> = ({ songs, artists }) => {
    const onPlay = useOnPlay(songs)

    if (songs?.length === 0) {
        return (
            <div className={styles.song} >
                No Song Found
            </div>
        )
    }
    return (
        <div className={styles.container}>
            {songs?.map((item) => (
                <MediaItem
                    key={item.id}
                    data={item}
                    artist={artists.find((person) => person.id === item.artist_id) as Artist}
                    onClick={(id: string) => onPlay(id)}
                />
            ))}
        </div>
    )
}

export default SearchContent
