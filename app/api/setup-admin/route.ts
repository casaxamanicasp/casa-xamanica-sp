import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

// ROTA TEMPORÁRIA — apagar após configurar o admin
export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!key) {
    return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY não configurada no Vercel' }, { status: 500 })
  }

  const supabase = createAdminClient()

  // Tenta criar usuário (funciona mesmo se já existir)
  const { data: created, error: createError } = await supabase.auth.admin.createUser({
    email: 'casaxamanica@gmail.com',
    password: 'Xamanica2026!',
    email_confirm: true,
  })

  if (!createError) {
    return NextResponse.json({ ok: true, action: 'criado', message: 'Usuário criado com senha Xamanica2026!' })
  }

  // Se já existe, busca e atualiza
  const { data: users, error: listError } = await supabase.auth.admin.listUsers({ perPage: 1000 })

  if (listError) {
    return NextResponse.json({ error: 'Erro ao listar: ' + listError.message, url }, { status: 500 })
  }

  const user = users?.users?.find((u) => u.email === 'casaxamanica@gmail.com')

  if (!user) {
    return NextResponse.json({ error: 'Não encontrado. Total users: ' + users?.users?.length, url }, { status: 404 })
  }

  const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
    password: 'Xamanica2026!',
    email_confirm: true,
  })

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, action: 'atualizado', message: 'Senha definida: Xamanica2026!' })
}
