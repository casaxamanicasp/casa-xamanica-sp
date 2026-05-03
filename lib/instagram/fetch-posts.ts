export type InstagramPost = {
  id: string
  media_url: string
  permalink: string
  caption?: string
  timestamp: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  thumbnail_url?: string
}

type BeholdPost = {
  id: string
  mediaType: string
  mediaUrl: string
  thumbnailUrl?: string
  permalink: string
  caption?: string
  timestamp: string
  sizes?: {
    medium?: { mediaUrl: string }
    large?: { mediaUrl: string }
  }
}

export async function fetchInstagramPosts(limit = 9): Promise<InstagramPost[]> {
  const feedId = process.env.BEHOLD_FEED_ID

  if (!feedId) return []

  try {
    const res = await fetch(
      `https://feeds.behold.so/${feedId}`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) return []
    const data = await res.json()

    const posts: BeholdPost[] = data.posts ?? []
    return posts.slice(0, limit).map((post) => ({
      id: post.id,
      media_url: post.sizes?.medium?.mediaUrl ?? post.thumbnailUrl ?? post.mediaUrl,
      permalink: post.permalink,
      caption: post.caption,
      timestamp: post.timestamp,
      media_type: post.mediaType === 'VIDEO' ? 'VIDEO' : post.mediaType === 'CAROUSEL_ALBUM' ? 'CAROUSEL_ALBUM' : 'IMAGE',
      thumbnail_url: post.sizes?.medium?.mediaUrl ?? post.thumbnailUrl,
    }))
  } catch {
    return []
  }
}
