import { supabase } from './client'

const WORK_PHOTOS_BUCKET = 'work-photos'
const AVATARS_BUCKET = 'avatars'
const CHAT_FILES_BUCKET = 'chat-files'

/**
 * 仕事記録の写真をアップロード
 */
export async function uploadWorkPhoto(
  file: File,
  userId: string,
  workRecordId: string,
  photoType: 'before' | 'after' | 'progress' | 'detail'
): Promise<{ url: string; path: string } | null> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${workRecordId}/${photoType}_${Date.now()}.${fileExt}`

  if (!supabase) return null

  const { data, error } = await supabase.storage
    .from(WORK_PHOTOS_BUCKET)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    return null
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(WORK_PHOTOS_BUCKET).getPublicUrl(data.path)

  return {
    url: publicUrl,
    path: data.path,
  }
}

/**
 * プロフィール画像をアップロード
 */
export async function uploadAvatar(
  file: File,
  userId: string
): Promise<{ url: string; path: string } | null> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/avatar_${Date.now()}.${fileExt}`

  if (!supabase) return null

  const { data, error } = await supabase.storage
    .from(AVATARS_BUCKET)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true,
    })

  if (error) {
    return null
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(AVATARS_BUCKET).getPublicUrl(data.path)

  return {
    url: publicUrl,
    path: data.path,
  }
}

/**
 * チャットファイルをアップロード
 */
export async function uploadChatFile(
  file: File,
  userId: string,
  roomId: string
): Promise<{ url: string; path: string } | null> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${roomId}/${userId}_${Date.now()}.${fileExt}`

  if (!supabase) return null

  const { data, error } = await supabase.storage
    .from(CHAT_FILES_BUCKET)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    return null
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(CHAT_FILES_BUCKET).getPublicUrl(data.path)

  return {
    url: publicUrl,
    path: data.path,
  }
}

/**
 * ファイルを削除
 */
export async function deleteFile(bucket: string, path: string): Promise<boolean> {
  if (!supabase) return false

  const { error } = await supabase.storage.from(bucket).remove([path])

  if (error) {
    return false
  }

  return true
}
