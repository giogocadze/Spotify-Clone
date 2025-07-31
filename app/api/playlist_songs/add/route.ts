// app/api/playlistSongs/add/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { addSongToPlaylist } from '@/actions/playlistSongs';

export async function POST(request: NextRequest) {
    try {
        const { playlistId, songId } = await request.json();

        if (!playlistId || !songId) {
            return NextResponse.json(
                { error: 'Missing playlistId or songId' },
                { status: 400 }
            );
        }

        const playlistSong = await addSongToPlaylist(playlistId, songId);

        return NextResponse.json({ success: true, data: playlistSong });
    } catch (error: unknown) {
        console.error("Error in add song route:", error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
}
