import { useMemo, useState } from 'react';
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

import { CATEGORY_COLORS, PALETTE } from '../constants';
import { capitalize, formatCurrency } from '../utils/format';

function CustomChartTooltip({ active, payload, totalExpense = 0 }) {
  if (active && payload && payload.length) {
    const item = payload[0];
    const val = item.value;
    const share = totalExpense > 0 ? ((val / totalExpense) * 100).toFixed(1) : 0;
    const labelName = item.name || item.payload?.name || '';
    return (
      <div className="custom-chart-tooltip">
        <p className="tooltip-label">{labelName}</p>
        <p className="tooltip-value">
          ${formatCurrency(val)}
        </p>
        <span className="tooltip-share">{share}% of total spending</span>
      </div>
    );
  }
  return null;
}

const renderLegendText = (value) => (
  <span style={{ color: '#475569', fontSize: 13, fontWeight: 500 }}>{value}</span>
);

function SpendingChart({ transactions = [] }) {
  const [chartType, setChartType] = useState('bar');

  const { data, totalExpense } = useMemo(() => {
    const spendingByCategory = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => {
        const category = (t.category || 'other').toLowerCase();
        const amount = parseFloat(t.amount) || 0;
        acc[category] = (acc[category] || 0) + amount;
        return acc;
      }, {});

    const categoryData = Object.entries(spendingByCategory).map(([category, amount], idx) => ({
      rawCategory: category,
      name: capitalize(category),
      amount: Number(amount.toFixed(2)),
      color: CATEGORY_COLORS[category] || PALETTE[idx % PALETTE.length],
    }));

    return {
      data: categoryData,
      totalExpense: categoryData.reduce((sum, item) => sum + item.amount, 0),
    };
  }, [transactions]);

  return (
    <div className="spending-chart">
      <div className="spending-chart-header">
        <div className="chart-title-wrap">
          <h2>Spending by Category</h2>
          <span className="section-hint">Distribution across active expense categories</span>
        </div>

        {data.length > 0 && (
          <div className="chart-toggle-group">
            <button
              type="button"
              className={`chart-toggle-btn ${chartType === 'bar' ? 'active' : ''}`}
              onClick={() => setChartType('bar')}
              aria-label="Switch to Bar Chart"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
              <span>Bar Chart</span>
            </button>
            <button
              type="button"
              className={`chart-toggle-btn ${chartType === 'pie' ? 'active' : ''}`}
              onClick={() => setChartType('pie')}
              aria-label="Switch to Pie Chart"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
              </svg>
              <span>Pie Chart</span>
            </button>
          </div>
        )}
      </div>

      {data.length === 0 ? (
        <div className="chart-empty-state">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p className="chart-empty">No expense data recorded yet to visualize</p>
        </div>
      ) : (
        <div className="chart-container-box">
          <ResponsiveContainer width="100%" height={280}>
            {chartType === 'bar' ? (
              <BarChart
                data={data}
                margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickFormatter={(val) => `$${val}`}
                  tick={{ fill: '#64748B', fontSize: 12 }}
                />
                <Tooltip content={<CustomChartTooltip totalExpense={totalExpense} />} />
                <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`bar-cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <PieChart>
                <Pie
                  data={data}
                  dataKey="amount"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={3}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`pie-cell-${index}`}
                      fill={entry.color}
                      stroke="#ffffff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomChartTooltip totalExpense={totalExpense} />} />
                <Legend
                  wrapperStyle={{ paddingTop: 16 }}
                  formatter={renderLegendText}
                />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default SpendingChart;
