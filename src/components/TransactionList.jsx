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

function TransactionList({
  transactions = [],
  categories = DEFAULT_CATEGORIES,
  filterType: controlledFilterType,
  setFilterType: controlledSetFilterType,
  filterCategory: controlledFilterCategory,
  setFilterCategory: controlledSetFilterCategory,
  filteredTransactions: passedFilteredTransactions,
  onDeleteTransaction,
  deleteTransaction,
  onDelete,
  setTransactions,
}) {
  const [internalFilterType, setInternalFilterType] = useState('all');
  const [internalFilterCategory, setInternalFilterCategory] = useState('all');

  const handleDelete =
    onDeleteTransaction ||
    deleteTransaction ||
    onDelete ||
    (setTransactions
      ? (id) => setTransactions((prev) => prev.filter((t) => t.id !== id))
      : null);

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      handleDelete(id);
    }
  };

  const filterType =
    controlledFilterType !== undefined
      ? controlledFilterType
      : internalFilterType;
  const setFilterType = controlledSetFilterType || setInternalFilterType;

  const filterCategory =
    controlledFilterCategory !== undefined
      ? controlledFilterCategory
      : internalFilterCategory;
  const setFilterCategory =
    controlledSetFilterCategory || setInternalFilterCategory;

  let displayTransactions = passedFilteredTransactions;
  if (!displayTransactions) {
    displayTransactions = transactions;
    if (filterType !== 'all') {
      displayTransactions = displayTransactions.filter(
        (t) => t.type === filterType
      );
    }
    if (filterCategory !== 'all') {
      displayTransactions = displayTransactions.filter(
        (t) => t.category === filterCategory
      );
    }
  }

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            {handleDelete && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {displayTransactions.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.description}</td>
              <td>{t.category}</td>
              <td
                className={
                  t.type === 'income' ? 'income-amount' : 'expense-amount'
                }
              >
                {t.type === 'income' ? '+' : '-'}${t.amount}
              </td>
              {handleDelete && (
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick(t.id)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
