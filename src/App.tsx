import React, { useState, useEffect } from 'react';

type Transaction = {
  id: number;
  description: string;
  value: number;
  type: 'income' | 'expense';
  category: string;
};

const initialTransactions: Transaction[] = [
  // Initial example, can be empty
  // { id: 1, description: 'Salary', value: 3000, type: 'income', category: 'Job' },
  // { id: 2, description: 'Supermarket', value: 150, type: 'expense', category: 'Food' },
];

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  useEffect(() => {
    console.log('Initial state of transactions:', transactions);
  }, [transactions]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Personal Finance</h1>
    </div>
  );
};

export default App;