import { createClient } from '@/lib/supabase/server'
import { fetchInstagramPosts } from '@/lib/instagram/fetch-posts'
import { fetchYouTubeVideos } from '@/lib/youtube/fetch-videos'
import { HeroSection } from '@/components/home/HeroSection'
import { NextEventsSection } from '@/components/home/NextEventsSection'
import { SobreSection } from '@/components/home/SobreSection'
import { GaleriaSection } from '@/components/home/GaleriaSection'
import { InstagramFeed } from '@/components/home/InstagramFeed'
import { YouTubeSection } from '@/components/home/YouTubeSection'
import { PodcastSection } from '@/components/home/PodcastSection'
import { TribalDivider } from '@/components/ui/TribalDivider'
import { Event } from '@/lib/types'

export default async function HomePage() {
  const supabase = await createClient()

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('is_active', true)
    .gte('date', new Date().toISOString())
    .order('date', { ascending: true })
    .limit(3)

  const [instagramPosts, youtubeVideos] = await Promise.all([
    fetchInstagramPosts(9),
    fetchYouTubeVideos(3),
  ])

  return (
    <>
      <HeroSection />
      <TribalDivider />
      <NextEventsSection events={(events ?? []) as Event[]} />
      <TribalDivider />
      <SobreSection />
      <TribalDivider flip />
      <PodcastSection />
      <TribalDivider flip />
      <YouTubeSection videos={youtubeVideos} />
      <TribalDivider />
      <InstagramFeed posts={instagramPosts} />
      <GaleriaSection />
    </>
  )
}
