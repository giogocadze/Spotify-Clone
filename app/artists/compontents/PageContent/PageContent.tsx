"use client"

import { Artist } from '@/types'
import styles from "./Page.module.css"
import React from 'react'
import ArtistItem from '../ArtistItem/ArtistItem'


interface PageContentProps {
    artists: Artist[]
}

const PageContent: React.FC<PageContentProps> = ({ artists }) => {

    if (artists?.length === 0) {
        return <div className={styles.paraghrap} >
            No Artists Data Available
        </div>
    }
    return (
        <div className={styles.artistGrid}>
            {artists?.map(item => (
                <div className={styles.artistItem} key={item.id}>
                    <ArtistItem onClick={() => { }} data={item} />
                </div>
              
            ))}
        </div>
    )
}

export default PageContent
