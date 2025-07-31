"use client"

import { Artist } from '@/types'
import styles from './ArtistsItem.module.css'
import React from 'react'
import Image from 'next/image'
import useLoadArtistImage from '@/hooks/useLoadArtistsImage copy'

interface ArtistItemProps {
  data: Artist,
  onClick: (id: string) => void
}
const ArtistItem: React.FC<ArtistItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadArtistImage(data);
  const handleClick = (id: string) => {
    console.log(id);
    onClick(data.id)
  }
  return (
    <div onClick={() => handleClick(data.id)} className={styles.artist}  >
      <div className={styles.thumbnail}>
        <Image
          className={styles.photo}
          fill
          alt={data.author}
          src={imagePath || "/img/user.png"}
        />
      </div>
      <p className={styles.paraghrap}>
        {data?.author}
      </p>
    </div>

  )
}

export default ArtistItem
