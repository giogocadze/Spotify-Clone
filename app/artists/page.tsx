import getArtists from '@/actions/getArtists';
import React from 'react'
import styles from "./page.module.css"
import Header from '@/components/Header/Header';
import PageContent from './compontents/PageContent/PageContent';

export const revalidate = 0;
const Artist = async () => {

    const artists = await getArtists()
    return (
        <div className={styles.rounded}>
            { /* header*/}
            <Header >
                <h2 className={styles.h2}>Our Popular Artists</h2>
            </Header>

            { /* page contents */}
            <div className={styles.content}>
                <PageContent artists={artists} />
            </div>
        </div>
    )
}

export default Artist


{/* <div>
{artists.map((artists) => (
    <p>{artists.author}</p>
))}
</div> */}