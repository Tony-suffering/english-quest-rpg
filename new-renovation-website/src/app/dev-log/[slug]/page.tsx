import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function DevLogDetailPage({ params }: Props) {
  const { slug } = await params
  redirect(`/journal/${slug}`)
}
