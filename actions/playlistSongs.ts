import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Song, PlaylistSong, Artist } from '@/types'

const supabase = () => createServerComponentClient({ cookies })

export async function getSongsInPlaylist(playlistId: string): Promise<Song[]> {
  const client = supabase()
  
  const { data, error } = await client
    .from('playlist_songs')
    .select(`
      id,
      song: songs (
        id,
        title,
        song_uri,
        image_uri,
        user_id,
        artist_id,
        artist: artist (
          id,
          author,
          picture,
          description,
          followers,
          facebook,
          instagram,
          linkedin
        )
      )
    `)
    .eq('playlist_id', playlistId)
    .order('created_at', { ascending: true })

  if (error) throw error
  if (!data) return []

  // data is array of playlist_song rows, each has a song array (usually single)
  // flatten all song arrays into one array
  const songs: Song[] = data.flatMap(item => {
    // item.song is an array of songs
    return item.song.map((song: any) => {
      // song.artist is an array (maybe one artist)
      const artist: Artist | undefined = Array.isArray(song.artist) ? song.artist[0] : song.artist
      return { ...song, artist }
    })
  })

  return songs
}

export async function addSongToPlaylist(playlistId: string, songId: string): Promise<PlaylistSong> {
  const client = supabase()

  const { data, error } = await client
    .from('playlist_songs')
    .insert([{ playlist_id: playlistId, song_id: songId }])
    .select()
    .single()

  if (error) throw error
  return data as PlaylistSong
}

export async function removeSongFromPlaylist(playlistSongId: string): Promise<boolean> {
  const client = supabase()

  const { error } = await client
    .from('playlist_songs')
    .delete()
    .eq('id', playlistSongId)

  if (error) throw error
  return true
}
