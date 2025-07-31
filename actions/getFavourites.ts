// actions/getFavourites.ts
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { type Song } from '@/types';
import { type Database } from '@/types_db';

const getFavourites = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient<Database>({ cookies });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user?.id) {
        console.error('No user in session:', session);
        return [];
    }

    const { data, error } = await supabase
        .from('favourites')
        .select('song:song_id(*)')
        .eq('user_id', session?.user?.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Supabase error:', error.message);
        return [];
    }

    const songs = (data ?? [])
        .map((item) => {
            if (!item.song) return null;

            return {
                ...item.song,
                id: item.song.id.toString(),
                artist_id: item.song.artist_id !== null ? item.song.artist_id.toString() : null,
            } as Song;
        })
        .filter((song): song is Song => !!song);
    return songs;
};

export default getFavourites;
