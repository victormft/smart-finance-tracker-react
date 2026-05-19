import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { supabase } from './supabaseClient';

type Transaction = {
  id: number;
  description: string;
  value: number;
  type: 'income' | 'expense';
  category: string;
};

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Fetch transactions from Supabase
  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      setTransactions(data as Transaction[]);
    }
  };

  useEffect(() => {
    fetchTransactions();
    // Optionally, add real-time subscription with Supabase here (not required by this prompt)
  }, []);

  const handleAddTransaction = async (tx: { description: string; value: number; type: 'income' | 'expense' }) => {
    const { error } = await supabase
      .from('transactions')
      .insert([
        {
          description: tx.description,
          value: tx.value,
          type: tx.type,
        },
      ]);
    if (!error) {
      await fetchTransactions();
    }
  };

  const handleDeleteTransaction = async (id: number) => {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);
    if (!error) {
      await fetchTransactions();
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Personal Finance</h1>
      <Dashboard transactions={transactions} />
      <TransactionForm onAddTransaction={handleAddTransaction} />
      <TransactionList transactions={transactions} onDeleteTransaction={handleDeleteTransaction} />
    </div>
  );
};

export default App;