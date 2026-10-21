import { useState } from 'react'
import Summary from './components/Summary'
import SpendingChart from './components/SpendingChart'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import './App.css'

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary", amount: "5000", type: "income", category: "salary", date: "2025-01-01" },
    { id: 2, description: "Rent", amount: "1200", type: "expense", category: "housing", date: "2025-01-02" },
    { id: 3, description: "Groceries", amount: "150", type: "expense", category: "food", date: "2025-01-03" },
    { id: 4, description: "Freelance Work", amount: "800", type: "expense", category: "salary", date: "2025-01-05" },
    { id: 5, description: "Electric Bill", amount: "95", type: "expense", category: "utilities", date: "2025-01-06" },
    { id: 6, description: "Dinner Out", amount: "65", type: "expense", category: "food", date: "2025-01-07" },
    { id: 7, description: "Gas", amount: "45", type: "expense", category: "transport", date: "2025-01-08" },
    { id: 8, description: "Netflix", amount: "15", type: "expense", category: "entertainment", date: "2025-01-10" },
  ]);

  const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

  const handleAddTransaction = (newTransaction) => {
    const transactionWithDefaults = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...newTransaction,
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

        <TransactionForm onAddTransaction={handleAddTransaction} categories={categories} />

        <TransactionList
          transactions={transactions}
          categories={categories}
          onDeleteTransaction={handleDeleteTransaction}
        />
      </main>
    </div>
  );
}

export default App
