import React from 'react';

type Transaction = {
  id: number;
  description: string;
  value: number;
  type: 'income' | 'expense';
  category: string;
};

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: number) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDeleteTransaction,
}) => {
  return (
    <section style={{ margin: '2rem auto', maxWidth: '500px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '24px 18px' }}>
      <h3 style={{ marginBottom: '16px', color: '#222', fontWeight: 700, fontSize: '1.35rem' }}>Transaction History</h3>
      {transactions.length === 0 ? (
        <p style={{ color: '#888', textAlign: 'center', marginTop: '30px', marginBottom: 0 }}>No transactions recorded yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {transactions.map(tx => (
            <li
              key={tx.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderLeft: `5px solid ${
                  tx.type === 'income' ? '#4caf50' : '#f44336'
                }`,
                background: '#fafcff',
                marginBottom: '12px',
                padding: '10px 12px 10px 18px',
                borderRadius: '5px',
                boxShadow: '0 1px 4px rgba(66,66,66,0.05)',
              }}
            >
              <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                <strong style={{ color: '#292e34', fontSize: '1.03rem' }}>{tx.description}</strong>
                <span
                  style={{
                    display: 'inline-block',
                    marginLeft: '12px',
                    color: tx.type === 'income' ? '#4caf50' : '#f44336',
                    fontWeight: 600,
                    fontSize: '1rem',
                  }}
                >
                  {tx.type === 'expense' ? '-' : '+'}${Math.abs(tx.value).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => onDeleteTransaction(tx.id)}
                style={{
                  marginLeft: '14px',
                  background: '#e0e4e8',
                  color: '#f44336',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 14px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.16s',
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};