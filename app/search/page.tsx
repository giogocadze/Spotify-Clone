import getArtists from '@/actions/getArtists';
import getSongsByTitle from '@/actions/getSongsByTitle';
import React from 'react'
import styles from "./page.module.css"
import Header from '@/components/Header/Header';
import SearchInput from '@/components/SearchInput/SearchInput';
import SearchContent from './components/SearchContent/SearchContent';
interface SearchProps {
    searchParams: {
        title: string;
    }
}

const revalidate = 0

const Search = async ({ searchParams }: SearchProps) => {

    const songs = await getSongsByTitle(searchParams.title);
    const artists = await getArtists();
    return (
        <div className={styles.container}>

            {/* header */}
            <Header>
                <h2 className={styles.h2}>Search here by song title</h2>


                {/* Search  Input */}

                <SearchInput />
            </Header>
            <div className={styles.searchcontent} >
                <SearchContent
                    songs={songs}
                    artists={artists}
                />
            </div>
        </div>
    )
}

export default Search
