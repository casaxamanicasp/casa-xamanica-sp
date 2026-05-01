export type YouTubeVideo = {
  id: string
  title: string
  description: string
  thumbnail: string
  publishedAt: string
  videoUrl: string
}

export async function fetchYouTubeVideos(limit = 3): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY
  const channelId = process.env.YOUTUBE_CHANNEL_ID

  if (!apiKey || !channelId) return []

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?channelId=${channelId}&order=date&maxResults=${limit}&type=video&key=${apiKey}&part=snippet`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) return []
    const data = await res.json()

    return (data.items ?? []).map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails?.high?.url ?? item.snippet.thumbnails?.default?.url,
      publishedAt: item.snippet.publishedAt,
      videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }))
  } catch {
    return []
  }
}
