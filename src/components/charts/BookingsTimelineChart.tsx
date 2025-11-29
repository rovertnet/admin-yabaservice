import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface BookingsTimelineChartProps {
  data: Array<{
    date: string;
    count: number;
    completed: number;
    pending: number;
    cancelled: number;
  }>;
}

const BookingsTimelineChart: React.FC<BookingsTimelineChartProps> = ({ data }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  return (
    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1a202c', marginBottom: '1rem' }}>
        📈 Réservations (30 derniers jours)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#667eea" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#667eea" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            stroke="#718096"
            style={{ fontSize: '0.875rem' }}
          />
          <YAxis stroke="#718096" style={{ fontSize: '0.875rem' }} />
          <Tooltip 
            contentStyle={{ 
              background: 'white', 
              border: '1px solid #e2e8f0', 
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="count" 
            stroke="#667eea" 
            fillOpacity={1} 
            fill="url(#colorCount)"
            name="Total"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingsTimelineChart;
