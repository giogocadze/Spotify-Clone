import Header from '@/components/Header/Header';
import React from 'react';
import styles from "./page.module.css";
import { FaHeart } from 'react-icons/fa6';
import getFavourites from '@/actions/getFavourites';
import getArtists from '@/actions/getArtists';
import PageContent from './components/PageContent/PageContent';

export const revalidate = 0;

const Favourites = async () => {
    const songs = await getFavourites();
    const artists = await getArtists()
    return (
        <div className={styles.rounded}>
            {/* header */}
            <Header>
                <div className={styles.container}>
                    <div className={styles.box}>
                        <FaHeart className={styles.icon} />
                    </div>
                    <div className={styles.layout}>
                        <p className={styles.favourites}>Playlist</p>
                        <p className={styles.title}>Favourite Songs</p>
                    </div>
                </div>
            </Header>

            {/* page contents */}

            <div className={styles.content}>
                <PageContent songs={songs} artists={artists} />
            </div>
        </div>
    );
};

export default Favourites;
