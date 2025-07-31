import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { Playlist } from '@/types'

// create client with a cookies getter function
const supabase = () => createServerComponentClient({ cookies: () => cookies() })

export async function getUserPlaylists(): Promise<Playlist[]> {
    const client = supabase()

    const {
        data: { user },
        error: authError,
    } = await client.auth.getUser()

    if (authError || !user) throw new Error('User not authenticated')

    const { data, error } = await client
        .from('playlist')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    if (error) throw error
    return data as Playlist[]
}

export async function getPlaylistById(id: string): Promise<Playlist | null> {
    const client = supabase()

    const { data, error } = await client
        .from('playlist')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching playlist:', error)
        return null
    }

    return data as Playlist
}

export async function createPlaylist(
    title: string,
    description?: string,
    image_url?: string
): Promise<Playlist> {
    const client = supabase()

    const {
        data: { user },
        error: authError,
    } = await client.auth.getUser()

    if (authError || !user) throw new Error('User not authenticated')

    const { data, error } = await client
        .from('playlist')
        .insert([{ title, user_id: user.id, description, image_url }])
        .select()
        .single()

    if (error) throw error
    return data as Playlist
}

export async function deletePlaylist(playlistId: string): Promise<boolean> {
    const client = supabase()

    const { error } = await client
        .from('playlist')
        .delete()
        .eq('id', playlistId)

    if (error) throw error
    return true
}
