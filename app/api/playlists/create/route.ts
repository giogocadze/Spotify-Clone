import { NextResponse } from 'next/server'
import { createPlaylist } from '@/actions/playlist'

export async function POST(request: Request) {
    try {
        const { name, description } = await request.json()

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 })
        }

        const newPlaylist = await createPlaylist(name, description)

        return NextResponse.json(newPlaylist)
    } catch (error) {
        console.error('Failed to create playlist:', error)
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}
