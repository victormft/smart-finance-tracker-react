import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { TransactionForm } from './components/TransactionForm';

type Transaction = {
  id: number;
  description: string;
  value: number;
  type: 'income' | 'expense';
  category: string;
};

const initialTransactions: Transaction[] = [
  { id: 1, description: 'Salary', value: 5000, type: 'income', category: 'Job' },
  { id: 2, description: 'Rent', value: 1200, type: 'expense', category: 'Housing' },
];

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  useEffect(() => {
    console.log('Initial state of transactions:', transactions);
  }, [transactions]);

  const handleAddTransaction = (tx: { description: string; value: number; type: 'income' | 'expense' }) => {
    const newTransaction: Transaction = {
      id: Date.now(),
      description: tx.description,
      value: tx.value,
      type: tx.type,
      category: '', // or 'General'
    };
    setTransactions(prev => [...prev, newTransaction]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Personal Finance</h1>
      <Dashboard transactions={transactions} />
      <TransactionForm onAddTransaction={handleAddTransaction} />
    </div>
  );
};

export default App;