import { useState } from 'react';
import { CATEGORIES } from '../constants';
import { capitalize } from '../utils/format';

const INITIAL_FORM = {
  description: '',
  amount: '',
  type: 'expense',
  category: 'food',
};

function TransactionForm({ onAddTransaction }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const { description, amount, type, category } = form;
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedDescription = description.trim();
    const value = parseFloat(amount);
    if (!trimmedDescription) {
      setError('Please enter a description.');
      return;
    }
    if (!Number.isFinite(value) || value <= 0) {
      setError('Amount must be greater than 0.');
      return;
    }

    onAddTransaction({ description: trimmedDescription, amount, type, category });

    setError('');
    setForm(INITIAL_FORM);
  };

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

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
            onChange={handleChange('description')}
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
              min="0.01"
              placeholder="0.00"
              value={amount}
              onChange={handleChange('amount')}
              required
            />
          </div>
        </div>

        <div className="form-group form-group-type">
          <label htmlFor="tx-type">Type</label>
          <select id="tx-type" value={type} onChange={handleChange('type')}>
            <option value="income">Income (+)</option>
            <option value="expense">Expense (-)</option>
          </select>
        </div>

        <div className="form-group form-group-category">
          <label htmlFor="tx-category">Category</label>
          <select id="tx-category" value={category} onChange={handleChange('category')}>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {capitalize(cat)}
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

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default TransactionForm;
