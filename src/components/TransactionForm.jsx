import { useState } from 'react';

const DEFAULT_CATEGORIES = [
  'food',
  'housing',
  'utilities',
  'transport',
  'entertainment',
  'salary',
  'other',
];

function TransactionForm({
  onAddTransaction,
  addTransaction,
  setTransactions,
  categories = DEFAULT_CATEGORIES,
}) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('food');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newTransaction = {
      id: Date.now(),
      description,
      amount,
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    };

    if (onAddTransaction) {
      onAddTransaction(newTransaction);
    } else if (addTransaction) {
      addTransaction(newTransaction);
    } else if (setTransactions) {
      setTransactions((prev) => [...prev, newTransaction]);
    }

    setDescription('');
    setAmount('');
    setType('expense');
    setCategory('food');
  };

  return (
    <div className="add-transaction">
      <div className="section-header">
        <h2>Add Transaction</h2>
        <span className="section-hint">Enter your recent income or expense record</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group form-group-desc">
          <label htmlFor="tx-description">Description</label>
          <input
            id="tx-description"
            type="text"
            placeholder="e.g. Monthly Rent, Coffee, Client Invoice"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group form-group-amount">
          <label htmlFor="tx-amount">Amount</label>
          <div className="input-currency-wrapper">
            <span className="currency-prefix">$</span>
            <input
              id="tx-amount"
              type="number"
              step="any"
              min="0"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group form-group-type">
          <label htmlFor="tx-type">Type</label>
          <select id="tx-type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income (+)</option>
            <option value="expense">Expense (-)</option>
          </select>
        </div>

        <div className="form-group form-group-category">
          <label htmlFor="tx-category">Category</label>
          <select id="tx-category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group form-group-btn">
          <button type="submit" className="btn-primary">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Add</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;
