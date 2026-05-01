export type InstagramPost = {
  id: string
  media_url: string
  permalink: string
  caption?: string
  timestamp: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  thumbnail_url?: string
}

export async function fetchInstagramPosts(limit = 9): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_USER_ID

  if (!token || !userId) return []

  try {
    const res = await fetch(
      `https://graph.instagram.com/${userId}/media?fields=id,caption,media_url,permalink,thumbnail_url,timestamp,media_type&limit=${limit}&access_token=${token}`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) return []
    const data = await res.json()
    return data.data ?? []
  } catch {
    return []
  }
}
