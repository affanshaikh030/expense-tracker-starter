import { useMemo, useState } from 'react';
import { CATEGORIES } from '../constants';
import { capitalize, formatCurrency, normalizeCategory } from '../utils/format';

function TransactionList({
  transactions = [],
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

  const displayTransactions = useMemo(
    () =>
      passedFilteredTransactions ||
      transactions.filter(
        (t) =>
          (filterType === 'all' || t.type === filterType) &&
          (filterCategory === 'all' || normalizeCategory(t.category) === filterCategory)
      ),
    [passedFilteredTransactions, transactions, filterType, filterCategory]
  );

  return (
    <div className="transactions">
      <div className="transactions-header">
        <div className="section-title-wrap">
          <h2>Transaction History</h2>
          <span className="count-pill">
            {displayTransactions.length} {displayTransactions.length === 1 ? 'record' : 'records'}
          </span>
        </div>

        <div className="filters">
          <div className="filter-item">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              aria-label="Filter by type"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="filter-item">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              aria-label="Filter by category"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {capitalize(cat)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="table-responsive">
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
            {displayTransactions.length === 0 ? (
              <tr>
                <td colSpan={handleDelete ? 5 : 4} className="empty-table-cell">
                  <div className="empty-table-state">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    <p>No transactions match the selected filters</p>
                  </div>
                </td>
              </tr>
            ) : (
              displayTransactions.map((t) => (
                <tr key={t.id}>
                  <td className="date-cell">{t.date}</td>
                  <td className="desc-cell">{t.description}</td>
                  <td>
                    <span className={`category-tag tag-${t.category || 'other'}`}>
                      {capitalize(t.category || 'other')}
                    </span>
                  </td>
                  <td
                    className={
                      t.type === 'income' ? 'income-amount' : 'expense-amount'
                    }
                  >
                    <span className="amount-badge">
                      {t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
                    </span>
                  </td>
                  {handleDelete && (
                    <td className="action-cell">
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteClick(t.id)}
                        aria-label={`Delete ${t.description}`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        <span>Delete</span>
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionList;
