import React, { useState } from 'react';

interface TransactionFormProps {
  onAddTransaction: (tx: {
    description: string;
    value: number;
    type: 'income' | 'expense';
  }) => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [description, setDescription] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [type, setType] = useState<'income' | 'expense'>('income');

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numericValue = parseFloat(value);

    if (!description.trim()) {
      alert('Please enter a description.');
      return;
    }
    if (isNaN(numericValue) || numericValue <= 0) {
      alert('Please enter a valid amount greater than 0.');
      return;
    }

    onAddTransaction({
      description: description.trim(),
      value: numericValue,
      type,
    });

    setDescription('');
    setValue('');
    setType('income');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        alignItems: 'flex-end',
        background: '#fff',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '56rem',
        margin: '0 auto 24px auto',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ flex: '2 1 12rem', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <label htmlFor="description" style={{ marginBottom: '6px', fontWeight: 500 }}>
          Description
        </label>
        <input
          id="description"
          type="text"
          value={description}
          placeholder="Enter description"
          onChange={e => setDescription(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '1rem',
            boxSizing: 'border-box',
            width: '100%',
          }}
        />
      </div>
      <div style={{ flex: '1 1 8rem', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <label htmlFor="value" style={{ marginBottom: '6px', fontWeight: 500 }}>
          Value
        </label>
        <input
          id="value"
          type="number"
          min="0"
          step="0.01"
          value={value}
          placeholder="0.00"
          onChange={e => setValue(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '1rem',
            boxSizing: 'border-box',
            width: '100%',
          }}
        />
      </div>
      <div style={{ flex: '1 1 8rem', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <label htmlFor="type" style={{ marginBottom: '6px', fontWeight: 500 }}>
          Type
        </label>
        <select
          id="type"
          value={type}
          onChange={e => setType(e.target.value as 'income' | 'expense')}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '1rem',
            boxSizing: 'border-box',
            width: '100%',
          }}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column' }}>
        <span style={{ marginBottom: '6px', visibility: 'hidden', fontWeight: 500 }} aria-hidden="true">
          Action
        </span>
        <button
          type="submit"
          style={{
            padding: '8px 20px',
            background: '#2196f3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            lineHeight: 1.25,
          }}
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
};