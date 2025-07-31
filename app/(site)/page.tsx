import React from "react";
import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import Link from "next/link";
import { FaHeart } from "react-icons/fa6";
import getSongs from "@/actions/getSongs";
import getArtists from "@/actions/getArtists";
import PageContent from "./components/PageContent/PageContent";

export const revalidate = 0;

const Home = async () => {
  const songs = await getSongs();
  const artists = await getArtists();

  return (
    <div className={styles.container}>
      <Header>
        <h2>Welcome Back</h2>
        <Link href="/favourites" className={`${styles.link} ${styles.liked}`}>
          <div className={styles.wrapper}>
            <div className={styles.squaregradient}>
              <FaHeart color="#FFF" />
            </div>
            Liked Songs
          </div>
        </Link>
      </Header>

      <div className={styles.content}>
        <PageContent songs={songs} artists={artists} />
      </div>
    </div>
  );
};

export default Home;
