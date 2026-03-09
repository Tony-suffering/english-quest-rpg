/**
 * プロジェクト管理用カスタムフック
 * API呼び出し、ローディング状態、エラーハンドリングを統合
 */

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import type { Project, ProjectWithCustomer } from '@/types/database'
import * as projectsApi from '@/lib/api/projects'

export function useProjects() {
  const [projects, setProjects] = useState<ProjectWithCustomer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // プロジェクト一覧を取得
  const fetchProjects = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await projectsApi.getAllProjects()
      setProjects(data)
    } catch (err) {
      const error = err as Error
      setError(error)
      toast.error('プロジェクトの取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }, [])

  // ステータスでフィルタリング
  const fetchByStatus = useCallback(async (status: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await projectsApi.getProjectsByStatus(status)
      setProjects(data)
    } catch (err) {
      const error = err as Error
      setError(error)
      toast.error('プロジェクトの取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }, [])

  // 期間でフィルタリング
  const fetchByDateRange = useCallback(async (startDate: string, endDate: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await projectsApi.getProjectsByDateRange(startDate, endDate)
      setProjects(data)
    } catch (err) {
      const error = err as Error
      setError(error)
      toast.error('プロジェクトの取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }, [])

  // 新規プロジェクト作成
  const createProject = useCallback(async (project: Partial<Project>) => {
    try {
      const newProject = await projectsApi.createProject(project)
      toast.success('プロジェクトを作成しました')
      await fetchProjects() // 再取得
      return newProject
    } catch (err) {
      toast.error('プロジェクトの作成に失敗しました')
      throw err
    }
  }, [fetchProjects])

  // プロジェクト更新
  const updateProject = useCallback(async (id: string, updates: Partial<Project>) => {
    try {
      const updatedProject = await projectsApi.updateProject(id, updates)
      toast.success('プロジェクトを更新しました')

      // ローカル状態を更新（再取得せずに最適化）
      setProjects(prev =>
        prev.map(p => p.id === id ? { ...p, ...updatedProject } : p)
      )

      return updatedProject
    } catch (err) {
      toast.error('プロジェクトの更新に失敗しました')
      throw err
    }
  }, [])

  // プロジェクト削除
  const deleteProject = useCallback(async (id: string) => {
    try {
      await projectsApi.deleteProject(id)
      toast.success('プロジェクトを削除しました')

      // ローカル状態を更新
      setProjects(prev => prev.filter(p => p.id !== id))

      return true
    } catch (err) {
      toast.error('プロジェクトの削除に失敗しました')
      throw err
    }
  }, [])

  // 初回マウント時にデータ取得
  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  return {
    projects,
    loading,
    error,
    fetchProjects,
    fetchByStatus,
    fetchByDateRange,
    createProject,
    updateProject,
    deleteProject,
  }
}

/**
 * 単一プロジェクト取得用フック
 */
export function useProject(id: string | null) {
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchProject = useCallback(async () => {
    if (!id) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const data = await projectsApi.getProjectById(id)
      setProject(data)
    } catch (err) {
      const error = err as Error
      setError(error)
      toast.error('プロジェクトの取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchProject()
  }, [fetchProject])

  return {
    project,
    loading,
    error,
    refetch: fetchProject,
  }
}

/**
 * プロジェクト買掛管理用フック
 */
export function useProjectPayables(projectId: string) {
  const [payables, setPayables] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchPayables = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await projectsApi.getProjectPayables(projectId)
      setPayables(data)
    } catch (err) {
      const error = err as Error
      setError(error)
      toast.error('買掛情報の取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }, [projectId])

  const createPayable = useCallback(async (payable: any) => {
    try {
      await projectsApi.createProjectPayable({ ...payable, project_id: projectId })
      toast.success('買掛を追加しました')
      await fetchPayables()
    } catch (err) {
      toast.error('買掛の追加に失敗しました')
      throw err
    }
  }, [projectId, fetchPayables])

  const updatePayable = useCallback(async (id: string, updates: any) => {
    try {
      await projectsApi.updateProjectPayable(id, updates)
      toast.success('買掛を更新しました')
      await fetchPayables()
    } catch (err) {
      toast.error('買掛の更新に失敗しました')
      throw err
    }
  }, [fetchPayables])

  const deletePayable = useCallback(async (id: string) => {
    try {
      await projectsApi.deleteProjectPayable(id)
      toast.success('買掛を削除しました')
      setPayables(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      toast.error('買掛の削除に失敗しました')
      throw err
    }
  }, [])

  useEffect(() => {
    fetchPayables()
  }, [fetchPayables])

  return {
    payables,
    loading,
    error,
    fetchPayables,
    createPayable,
    updatePayable,
    deletePayable,
  }
}