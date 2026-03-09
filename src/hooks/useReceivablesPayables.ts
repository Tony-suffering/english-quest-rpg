// import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { FundsEntry } from '@/types/funds';

export function useReceivablesPayablesSync() {
  const supabase = createClient();
  const syncWithReceivablesPayables = async (entry: FundsEntry, clientId?: string, projectId?: string) => {
    if (!clientId) return;

    try {
      // 売掛エントリの場合
      if (entry.type === 'revenue' && entry.category === '売掛金') {
        await supabase.from('accounts_receivable').insert({
          client_id: clientId,
          project_id: projectId || null,
          invoice_date: entry.date,
          due_date: entry.date, // デフォルトは同日、後で変更可能
          description: entry.description,
          amount: entry.amount,
          notes: null
        });
      }
      
      // 買掛エントリの場合
      if (entry.type === 'expense' && entry.category === '買掛金') {
        await supabase.from('accounts_payable').insert({
          client_id: clientId,
          project_id: projectId || null,
          invoice_date: entry.date,
          due_date: entry.date, // デフォルトは同日、後で変更可能
          description: entry.description,
          amount: entry.amount,
          notes: null
        });
      }
    } catch {
      // Sync with receivables/payables failed silently
    }
  };

  const updatePaymentStatus = async (entryId: string, type: 'receivable' | 'payable', paidAmount: number) => {
    try {
      const table = type === 'receivable' ? 'accounts_receivable' : 'accounts_payable';
      const paymentTable = type === 'receivable' ? 'receivable_payments' : 'payable_payments';
      const idField = type === 'receivable' ? 'receivable_id' : 'payable_id';
      
      // 支払い記録を追加
      await supabase.from(paymentTable).insert({
        [idField]: entryId,
        payment_date: new Date().toISOString().split('T')[0],
        amount: paidAmount
      });
    } catch {
      // Update payment status failed silently
    }
  };

  return {
    syncWithReceivablesPayables,
    updatePaymentStatus
  };
}