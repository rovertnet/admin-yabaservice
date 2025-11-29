import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface PopularServicesChartProps {
  data: Array<{
    name: string;
    bookings: number;
  }>;
}

const PopularServicesChart: React.FC<PopularServicesChartProps> = ({ data }) => {
  return (
    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1a202c', marginBottom: '1rem' }}>
        ⭐ Services les plus populaires
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            type="number"
            stroke="#718096"
            style={{ fontSize: '0.875rem' }}
          />
          <YAxis 
            type="category" 
            dataKey="name"
            stroke="#718096"
            style={{ fontSize: '0.75rem' }}
            width={150}
          />
          <Tooltip 
            contentStyle={{ 
              background: 'white', 
              border: '1px solid #e2e8f0', 
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          />
          <Bar 
            dataKey="bookings" 
            fill="#48bb78"
            name="Réservations"
            radius={[0, 8, 8, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PopularServicesChart;
