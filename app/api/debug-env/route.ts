import { NextResponse } from 'next/server'

// TEMPORÁRIO — apagar após diagnóstico
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'NÃO DEFINIDA'
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'NÃO DEFINIDA'
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'NÃO DEFINIDA'

  return NextResponse.json({
    url,
    anon_start: anon.slice(0, 20) + '...',
    anon_end: '...' + anon.slice(-10),
    anon_length: anon.length,
    service_start: service.slice(0, 20) + '...',
    service_length: service.length,
  })
}
