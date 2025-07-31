"use client";

import { useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import useAuthModal from '@/hooks/useAuthModal';

import { Song, Artist } from '@/types';
import MediaItem from '@/components/MediaItem/MediaItem';
import styles from './PageContent.module.css';
import useOnPlay from '@/hooks/useOnPlay';
interface PageContentProps {
    songs: Song[];
    artists: Artist[];
}

const PageContent: React.FC<PageContentProps> = ({ songs, artists }) => {
    const { user, isLoading } = useUser();
    const router = useRouter();
    const authModal = useAuthModal();

    const onPlay = useOnPlay(songs)

    useEffect(() => {
        if (!isLoading && !user) {
            authModal.onOpen();
            router.replace('/');
        }
    });

    if (songs.length === 0) {
        return <div className={styles.song}>No Favourite Songs found</div>;
    }

    return (
        <div className={styles.container}>
            {songs?.map((item) => (
                <MediaItem
                    key={item.id}
                    data={item}
                    artist={artists.filter((person) => person.id === item.artist_id)[0]}
                    onClick={(id: string) => onPlay(id)}
                />
            ))}
        </div>
    );


};

export default PageContent;
