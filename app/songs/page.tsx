import React from 'react'
import styles from './page.module.css'
import Header from '@/components/Header/Header'
import Link from 'next/link'
import { FaHeart } from 'react-icons/fa6'
import getSongs from '@/actions/getSongs'
import getArtists from '@/actions/getArtists'
import PageContent from '../(site)/components/PageContent/PageContent'
import Image from 'next/image';



export const revalidate = 0

const Home = async () => {
  const songs = await getSongs()
  const artists = await getArtists();

  return (
    <div className={styles.container}>

      {/* header */}
      <Header>
        <h2>Songs</h2>
        <Link href={''} className={`${styles.link} ${styles.liked}`}>
          <div className={styles.wrapper}>
            <div className={styles.squaregradient}>
              <Image
                className={styles.image}
                alt="songs"
                src="/img/Note.png"
                width={20}
                height={20}
              />
            </div>
            Songs
          </div>
        </Link>
      </Header>

      <div className={styles.content}>
        <PageContent
          songs={songs}
          artists={artists}
        />
      </div>
    </div>
  )
}

export default Home

