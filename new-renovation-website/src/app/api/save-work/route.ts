import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  try {
    const supabase = await createClient()

    // 1. 認証チェック
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: '認証が必要です。ログインしてください。' },
        { status: 401 }
      )
    }

    const formData = await request.formData()

    const siteName = formData.get('siteName') as string
    const beforePhoto = formData.get('beforePhoto') as File
    const afterPhoto = formData.get('afterPhoto') as File
    const memo = formData.get('memo') as string | null
    const latitude = formData.get('latitude') as string | null
    const longitude = formData.get('longitude') as string | null

    // 2. 入力検証
    if (!siteName || !beforePhoto || !afterPhoto) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      )
    }

    // 写真の検証
    if (!beforePhoto.type.startsWith('image/') || !afterPhoto.type.startsWith('image/')) {
      return NextResponse.json(
        { error: '画像ファイルのみアップロード可能です' },
        { status: 400 }
      )
    }

    // 写真サイズの検証（5MB以下）
    if (beforePhoto.size > 5 * 1024 * 1024 || afterPhoto.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: '画像ファイルは5MB以下にしてください' },
        { status: 400 }
      )
    }

    // 3. 認証されたユーザーIDを使用
    const userId = user.id
    const workRecordId = crypto.randomUUID()

    // Supabase Storageに写真をアップロード
    const beforeFileName = `${userId}/${workRecordId}/before_${Date.now()}.${beforePhoto.name.split('.').pop()}`
    const afterFileName = `${userId}/${workRecordId}/after_${Date.now()}.${afterPhoto.name.split('.').pop()}`

    // ビフォー写真アップロード
    const { data: beforeData, error: beforeError } = await supabase.storage
      .from('work-photos')
      .upload(beforeFileName, beforePhoto, {
        cacheControl: '3600',
        upsert: false
      })

    if (beforeError) {
      if (isDevelopment) {
        console.error('ビフォー写真アップロードエラー:', beforeError)
      }
      return NextResponse.json(
        { error: 'ビフォー写真のアップロードに失敗しました' },
        { status: 500 }
      )
    }

    // アフター写真アップロード
    const { data: afterData, error: afterError } = await supabase.storage
      .from('work-photos')
      .upload(afterFileName, afterPhoto, {
        cacheControl: '3600',
        upsert: false
      })

    if (afterError) {
      if (isDevelopment) {
        console.error('アフター写真アップロードエラー:', afterError)
      }
      // ビフォー写真も削除
      await supabase.storage.from('work-photos').remove([beforeFileName])
      return NextResponse.json(
        { error: 'アフター写真のアップロードに失敗しました' },
        { status: 500 }
      )
    }

    // 公開URLを取得
    const { data: { publicUrl: beforeUrl } } = supabase.storage
      .from('work-photos')
      .getPublicUrl(beforeData.path)

    const { data: { publicUrl: afterUrl } } = supabase.storage
      .from('work-photos')
      .getPublicUrl(afterData.path)

    // Supabaseデータベースに保存
    const { data: workRecord, error: dbError } = await supabase
      .from('work_records')
      .insert({
        user_id: userId,
        site_name: siteName,
        work_date: new Date().toISOString().split('T')[0],
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        before_photo_url: beforeUrl,
        after_photo_url: afterUrl,
        memo: memo || null
      })
      .select()
      .single()

    if (dbError) {
      if (isDevelopment) {
        console.error('データベース保存エラー:', dbError)
      }
      // 写真も削除
      await supabase.storage.from('work-photos').remove([beforeFileName, afterFileName])
      return NextResponse.json(
        { error: 'データベースへの保存に失敗しました' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      record: workRecord,
      message: '作業記録を保存しました'
    })

  } catch (error) {
    if (isDevelopment) {
      console.error('作業記録保存エラー:', error)
    }
    return NextResponse.json(
      { error: '作業記録の保存に失敗しました' },
      { status: 500 }
    )
  }
}
