/**
 * 取引先管理用カスタムフック
 */

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import type { Customer } from '@/types/database'
import * as customersApi from '@/lib/api/customers'

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchCustomers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await customersApi.getAllCustomers()
      setCustomers(data)
    } catch (err) {
      const error = err as Error
      setError(error)
      toast.error('取引先の取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }, [])

  const searchCustomers = useCallback(async (searchTerm: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await customersApi.searchCustomersByName(searchTerm)
      setCustomers(data)
    } catch (err) {
      const error = err as Error
      setError(error)
      toast.error('取引先の検索に失敗しました')
    } finally {
      setLoading(false)
    }
  }, [])

  const createCustomer = useCallback(async (customer: Omit<Customer, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newCustomer = await customersApi.createCustomer(customer)
      toast.success('取引先を作成しました')
      await fetchCustomers()
      return newCustomer
    } catch (err) {
      toast.error('取引先の作成に失敗しました')
      throw err
    }
  }, [fetchCustomers])

  const updateCustomer = useCallback(async (id: string, updates: Partial<Customer>) => {
    try {
      const updatedCustomer = await customersApi.updateCustomer(id, updates)
      toast.success('取引先を更新しました')
      setCustomers(prev =>
        prev.map(c => c.id === id ? { ...c, ...updatedCustomer } : c)
      )
      return updatedCustomer
    } catch (err) {
      toast.error('取引先の更新に失敗しました')
      throw err
    }
  }, [])

  const deleteCustomer = useCallback(async (id: string) => {
    try {
      await customersApi.deleteCustomer(id)
      toast.success('取引先を削除しました')
      setCustomers(prev => prev.filter(c => c.id !== id))
      return true
    } catch (err) {
      toast.error('取引先の削除に失敗しました')
      throw err
    }
  }, [])

  useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  return {
    customers,
    loading,
    error,
    fetchCustomers,
    searchCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  }
}