import { redirect } from 'next/navigation'

export const runtime = 'edge'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function DevLogDetailPage({ params }: Props) {
  const { slug } = await params
  redirect(`/journal/${slug}`)
}
