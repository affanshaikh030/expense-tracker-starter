import { useState } from 'react'
import Summary from './components/Summary'
import SpendingChart from './components/SpendingChart'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import { INITIAL_TRANSACTIONS } from './constants'
import './App.css'

function App() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);

  const handleAddTransaction = (newTransaction) => {
    const transactionWithDefaults = {
      ...newTransaction,
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
    };
    setTransactions((prev) => [...prev, transactionWithDefaults]);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-brand">
          <div className="app-logo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div>
            <h1>Finance Tracker</h1>
            <p className="subtitle">Track your income and expenses</p>
          </div>
        </div>
        <div className="app-status-badge">
          <span className="live-dot" aria-hidden="true"></span>
          <span>Ledger Live</span>
        </div>
      </header>

      <main className="app-main">
        <Summary transactions={transactions} />

        <SpendingChart transactions={transactions} />

        <TransactionForm onAddTransaction={handleAddTransaction} />

        <TransactionList
          transactions={transactions}
          onDeleteTransaction={handleDeleteTransaction}
        />
      </main>
    </div>
  );
}

export default App
