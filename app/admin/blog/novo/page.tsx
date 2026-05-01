import { PostForm } from '../PostForm'
export default function NovoBlogPage() {
  return (
    <div>
      <h1 className="font-[--font-titulo] text-2xl font-bold text-[--color-floresta-escuro] mb-6">Novo Post</h1>
      <PostForm />
    </div>
  )
}
