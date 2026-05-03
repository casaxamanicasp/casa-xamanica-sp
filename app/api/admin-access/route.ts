import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

// TEMPORÁRIO — apagar após entrar no admin
export async function GET() {
  const supabase = createAdminClient()

  const { data, error } = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email: 'casaxamanica@gmail.com',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/admin`,
    },
  })

  if (error || !data?.properties?.action_link) {
    return NextResponse.json({ error: error?.message ?? 'Falhou' }, { status: 500 })
  }

  return NextResponse.redirect(data.properties.action_link)
}
