
import { NextResponse } from 'next/server'
import { getSortedPostsData } from '@/lib/posts'

export async function GET() {
    try {
        const allPosts = getSortedPostsData()
        const latestPosts = allPosts.slice(0, 15) // Get top 15 for marquee
        return NextResponse.json(latestPosts)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
    }
}
