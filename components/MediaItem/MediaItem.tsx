
"use client"
import { Artist, Song } from '@/types'
import React from 'react'
import styles from "./MediaItem.module.css"
import useLoadSongImage from '@/hooks/useLoadSongImage'
import Image from 'next/image'
import useLoadArtistImage from '@/hooks/useLoadArtistsImage copy'
import { useUser } from '@/hooks/useUser'
import LikeButton from '../LikeButton/LikeButton'
interface MediaItemProps {
    data: Song,
    artist: Artist,
    className?: string
    onClick: (id: string) => void
}
const MediaItem: React.FC<MediaItemProps> = ({
    data,
    artist,
    className,
    onClick,
}) => {

    const songImagePath = useLoadSongImage(data);
    const artistmagePath = useLoadArtistImage(artist);
    const { user } = useUser();
    const handleClick = () => {
        if (onClick) {
            return onClick(data.id)
        }
    }
    return (
        <div
            onClick={handleClick}
            className={`${styles.container} ${className || ''}`} >
            <div className={styles.imageWrapper} >
                <Image
                    src={songImagePath || "/img/song.jpg"}
                    alt={data.title}
                    fill
                    className={styles.image}
                />
            </div>
            {/* title section*/}
            <div className={styles.wrapper} >
                <p className={styles.text}>{data.title}</p>
                {artist && (
                    <div className={styles.imagepath} >
                        <div className={styles.imagee} >
                            <Image
                                src={artistmagePath || "/img/avatar.jpg"}
                                alt={artist.author}
                                fill
                                className={styles.image}
                            />
                        </div>
                        <div className={styles.author}>{artist.author}</div>
                    </div>
                )}
            </div>
            {/* like section*/}
            {
                user && (
                    <LikeButton
                        songId={data.id}
                    />
                )
            }

        </div >
    );
};

export default MediaItem;
