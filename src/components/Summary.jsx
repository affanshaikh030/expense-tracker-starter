import { useMemo } from 'react';
import { formatCurrency } from '../utils/format';

function Summary({ transactions = [] }) {
  const { totalIncome, totalExpenses } = useMemo(
    () =>
      transactions.reduce(
        (totals, t) => {
          const amount = parseFloat(t.amount || 0);
          if (t.type === 'income') totals.totalIncome += amount;
          else if (t.type === 'expense') totals.totalExpenses += amount;
          return totals;
        },
        { totalIncome: 0, totalExpenses: 0 }
      ),
    [transactions]
  );

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary">
      <div className="summary-card income-card">
        <div className="summary-card-header">
          <h3>Total Income</h3>
          <span className="summary-icon income-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </span>
        </div>
        <p className="income-amount">${formatCurrency(totalIncome)}</p>
      </div>

      <div className="summary-card expense-card">
        <div className="summary-card-header">
          <h3>Total Expenses</h3>
          <span className="summary-icon expense-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </span>
        </div>
        <p className="expense-amount">${formatCurrency(totalExpenses)}</p>
      </div>

      <div className={`summary-card balance-card ${balance >= 0 ? 'positive' : 'negative'}`}>
        <div className="summary-card-header">
          <h3>Net Balance</h3>
          <span className="summary-icon balance-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2"></rect>
              <line x1="2" y1="10" x2="22" y2="10"></line>
            </svg>
          </span>
        </div>
        <p className="balance-amount">${formatCurrency(balance)}</p>
      </div>
    </div>
  );
}

export default Summary;
