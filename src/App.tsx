import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { Auth } from './components/Auth';
import { supabase } from './supabaseClient';
import type { Session } from '@supabase/supabase-js';

type Transaction = {
  id: number;
  description: string;
  value: number;
  type: 'income' | 'expense';
  category: string;
  user_id?: string;
};

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [session, setSession] = useState<Session | null>(null);

  // Set up the Supabase auth session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Fetch transactions from Supabase, scoped to user
  const fetchTransactions = async () => {
    if (!session?.user) return;
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });
    if (!error && data) {
      setTransactions(data as Transaction[]);
    }
  };

  // Re-fetch when session or handler called
  useEffect(() => {
    if (session?.user) {
      fetchTransactions();
    }
  }, [session]);

  const handleAddTransaction = async (
    tx: { description: string; value: number; type: 'income' | 'expense' }
  ) => {
    if (!session?.user) return;
    const { error } = await supabase
      .from('transactions')
      .insert([
        {
          description: tx.description,
          value: tx.value,
          type: tx.type,
          user_id: session.user.id,
        },
      ]);
    if (!error) {
      await fetchTransactions();
    }
  };

  const handleDeleteTransaction = async (id: number) => {
    if (!session?.user) return;
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)
      .eq('user_id', session.user.id);
    if (!error) {
      await fetchTransactions();
    }
  };

  if (!session) {
    return <Auth />;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>Personal Finance</h1>
        <button
          style={{
            padding: '8px 18px',
            borderRadius: 6,
            border: 'none',
            background: '#d34242',
            color: '#fff',
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
            marginLeft: 12
          }}
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
      <Dashboard transactions={transactions} />
      <TransactionForm onAddTransaction={handleAddTransaction} />
      <TransactionList transactions={transactions} onDeleteTransaction={handleDeleteTransaction} />
    </div>
  );
};

export default App;