import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

// ROTA TEMPORÁRIA — apagar após configurar o admin
export async function GET() {
  const supabase = createAdminClient()

  const { data: users } = await supabase.auth.admin.listUsers()
  const user = users?.users?.find((u) => u.email === 'casaxamanica@gmail.com')

  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
  }

  const { error } = await supabase.auth.admin.updateUserById(user.id, {
    password: 'Xamanica2026!',
    email_confirm: true,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, message: 'Senha definida: Xamanica2026!' })
}
