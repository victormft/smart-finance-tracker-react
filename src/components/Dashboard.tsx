import React from 'react';

type Transaction = {
  id: number;
  description: string;
  value: number;
  type: 'income' | 'expense';
  category: string;
};

interface DashboardProps {
  transactions: Transaction[];
}

const cardStyle: React.CSSProperties = {
  flex: 1,
  margin: '0 10px',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  background: '#fff',
  minWidth: '180px',
  textAlign: 'center'
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '20px',
  justifyContent: 'center',
  alignItems: 'stretch',
  margin: '30px 0'
};

export const Dashboard: React.FC<DashboardProps> = ({ transactions }) => {
  const totalIncome = transactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.value, 0);

  const totalExpenses = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.value, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <section style={containerStyle}>
      <div style={{ ...cardStyle, borderTop: '4px solid #4caf50' }}>
        <h2>Income</h2>
        <p style={{ fontSize: '1.5rem', color: '#4caf50', margin: 0 }}>
          ${totalIncome.toLocaleString()}
        </p>
      </div>
      <div style={{ ...cardStyle, borderTop: '4px solid #f44336' }}>
        <h2>Expenses</h2>
        <p style={{ fontSize: '1.5rem', color: '#f44336', margin: 0 }}>
          ${totalExpenses.toLocaleString()}
        </p>
      </div>
      <div style={{ ...cardStyle, borderTop: '4px solid #2196f3' }}>
        <h2>Balance</h2>
        <p style={{ fontSize: '1.5rem', color: '#2196f3', margin: 0 }}>
          ${balance.toLocaleString()}
        </p>
      </div>
    </section>
  );
};