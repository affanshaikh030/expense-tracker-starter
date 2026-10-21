import { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884D8',
  '#82CA9D',
  '#FF6B6B',
  '#4ECDC4',
];

function SpendingChart({ transactions = [] }) {
  const [chartType, setChartType] = useState('bar');

  const spendingByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      const category = t.category || 'other';
      const amount = parseFloat(t.amount) || 0;
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {});

  const data = Object.entries(spendingByCategory).map(([category, amount]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    amount: Number(amount.toFixed(2)),
  }));

  const totalExpense = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="spending-chart">
      <div className="spending-chart-header">
        <h2>Spending by Category</h2>
        {data.length > 0 && (
          <div className="chart-toggle-group">
            <button
              type="button"
              className={`chart-toggle-btn ${chartType === 'bar' ? 'active' : ''}`}
              onClick={() => setChartType('bar')}
            >
              Bar Chart
            </button>
            <button
              type="button"
              className={`chart-toggle-btn ${chartType === 'pie' ? 'active' : ''}`}
              onClick={() => setChartType('pie')}
            >
              Pie Chart
            </button>
          </div>
        )}
      </div>

      {data.length === 0 ? (
        <p className="chart-empty">No expense data available to display</p>
      ) : (
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height={300}>
            {chartType === 'bar' ? (
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(val) => `$${val}`} />
                <Tooltip
                  formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Spending']}
                />
                <Bar dataKey="amount" fill="#e74c3c" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <PieChart>
                <Pie
                  data={data}
                  dataKey="amount"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [
                    `$${Number(value).toFixed(2)} (${((Number(value) / totalExpense) * 100).toFixed(1)}%)`,
                    'Spending',
                  ]}
                />
                <Legend />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default SpendingChart;
