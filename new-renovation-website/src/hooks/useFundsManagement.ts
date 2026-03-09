import { useState, useCallback, useMemo } from 'react'
import { FundsEntry, FundsSummary, ProjectFunds } from '@/types/funds'

export interface UseFundsManagementProps {
  initialEntries?: FundsEntry[]
  initialBalance?: number
}

export const useFundsManagement = ({
  initialEntries = [],
  initialBalance = 0,
}: UseFundsManagementProps = {}) => {
  const [entries, setEntries] = useState<FundsEntry[]>(initialEntries)

  const addEntry = useCallback((entry: Omit<FundsEntry, 'id' | 'created_at' | 'updated_at'>) => {
    const newEntry: FundsEntry = {
      ...entry,
      id: `entry-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    setEntries(prev => [...prev, newEntry])
    return newEntry
  }, [])

  const updateEntry = useCallback((id: string, updates: Partial<FundsEntry>) => {
    setEntries(prev => prev.map(entry => 
      entry.id === id 
        ? { ...entry, ...updates, updated_at: new Date().toISOString() }
        : entry
    ))
  }, [])

  const deleteEntry = useCallback((id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id))
  }, [])

  const getEntriesByDateRange = useCallback((startDate: string, endDate: string) => {
    return entries.filter(entry => {
      const entryDate = new Date(entry.date)
      return entryDate >= new Date(startDate) && entryDate <= new Date(endDate)
    })
  }, [entries])

  const getEntriesByProject = useCallback((projectId: string) => {
    return entries.filter(entry => entry.project_id === projectId)
  }, [entries])

  const calculateSummary = useCallback((
    startDate: string,
    endDate: string
  ): FundsSummary => {
    const periodEntries = getEntriesByDateRange(startDate, endDate)
    
    const totalRevenue = periodEntries
      .filter(e => e.type === 'revenue')
      .reduce((sum, e) => sum + e.amount, 0)
    
    const totalExpense = periodEntries
      .filter(e => e.type === 'expense')
      .reduce((sum, e) => sum + e.amount, 0)
    
    const totalOperatingCost = periodEntries
      .filter(e => e.type === 'operating_cost')
      .reduce((sum, e) => sum + e.amount, 0)
    
    const netCashFlow = totalRevenue - totalExpense - totalOperatingCost
    
    return {
      period: {
        start_date: startDate,
        end_date: endDate,
      },
      opening_balance: initialBalance,
      total_revenue: totalRevenue,
      total_expense: totalExpense,
      total_operating_cost: totalOperatingCost,
      net_cash_flow: netCashFlow,
      closing_balance: initialBalance + netCashFlow,
    }
  }, [getEntriesByDateRange, initialBalance])

  const projectSummaries = useMemo((): ProjectFunds[] => {
    const projectMap = new Map<string, ProjectFunds>()
    
    entries.forEach(entry => {
      if (!entry.project_id) return
      
      if (!projectMap.has(entry.project_id)) {
        projectMap.set(entry.project_id, {
          project_id: entry.project_id,
          project_name: entry.project_id,
          total_revenue: 0,
          total_expense: 0,
          profit_margin: 0,
          status: 'in_progress',
        })
      }
      
      const project = projectMap.get(entry.project_id)!
      
      if (entry.type === 'revenue') {
        project.total_revenue += entry.amount
      } else if (entry.type === 'expense') {
        project.total_expense += entry.amount
      }
    })
    
    projectMap.forEach(project => {
      if (project.total_revenue > 0) {
        project.profit_margin = 
          ((project.total_revenue - project.total_expense) / project.total_revenue) * 100
      }
    })
    
    return Array.from(projectMap.values())
  }, [entries])

  const currentBalance = useMemo(() => {
    const totalRevenue = entries
      .filter(e => e.type === 'revenue')
      .reduce((sum, e) => sum + e.amount, 0)
    
    const totalExpense = entries
      .filter(e => e.type === 'expense')
      .reduce((sum, e) => sum + e.amount, 0)
    
    const totalOperatingCost = entries
      .filter(e => e.type === 'operating_cost')
      .reduce((sum, e) => sum + e.amount, 0)
    
    return initialBalance + totalRevenue - totalExpense - totalOperatingCost
  }, [entries, initialBalance])

  const getCalendarEvents = useCallback(() => {
    return entries.map(entry => ({
      id: entry.id,
      title: `${entry.type === 'revenue' ? '➕' : '➖'} ${entry.description}`,
      date: entry.date,
      amount: entry.amount,
      type: entry.type,
      category: entry.category,
      backgroundColor: entry.type === 'revenue' ? '#3B82F6' : '#EF4444',
    }))
  }, [entries])

  const getDashboardMetrics = useCallback(() => {
    const today = new Date()
    const thisMonth = today.toISOString().slice(0, 7)
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      .toISOString().slice(0, 7)
    
    const thisMonthEntries = entries.filter(e => e.date.startsWith(thisMonth))
    const lastMonthEntries = entries.filter(e => e.date.startsWith(lastMonth))
    
    const thisMonthRevenue = thisMonthEntries
      .filter(e => e.type === 'revenue')
      .reduce((sum, e) => sum + e.amount, 0)
    
    const lastMonthRevenue = lastMonthEntries
      .filter(e => e.type === 'revenue')
      .reduce((sum, e) => sum + e.amount, 0)
    
    const thisMonthExpense = thisMonthEntries
      .filter(e => e.type === 'expense' || e.type === 'operating_cost')
      .reduce((sum, e) => sum + e.amount, 0)
    
    const lastMonthExpense = lastMonthEntries
      .filter(e => e.type === 'expense' || e.type === 'operating_cost')
      .reduce((sum, e) => sum + e.amount, 0)
    
    return {
      currentBalance,
      thisMonthRevenue,
      thisMonthExpense,
      thisMonthProfit: thisMonthRevenue - thisMonthExpense,
      revenueGrowth: lastMonthRevenue > 0 
        ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 
        : 0,
      expenseGrowth: lastMonthExpense > 0
        ? ((thisMonthExpense - lastMonthExpense) / lastMonthExpense) * 100
        : 0,
      topProjects: projectSummaries.slice(0, 5),
    }
  }, [entries, currentBalance, projectSummaries])

  return {
    entries,
    setEntries,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntriesByDateRange,
    getEntriesByProject,
    calculateSummary,
    projectSummaries,
    currentBalance,
    getCalendarEvents,
    getDashboardMetrics,
  }
}