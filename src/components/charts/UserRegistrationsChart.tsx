import React from 'react';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface UserRegistrationsChartProps {
  data: Array<{
    date: string;
    total: number;
    clients: number;
    providers: number;
  }>;
}

const UserRegistrationsChart: React.FC<UserRegistrationsChartProps> = ({ data }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  return (
    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1a202c', marginBottom: '1rem' }}>
        👥 Nouvelles inscriptions (30 derniers jours)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorClients" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4299e1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#4299e1" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorProviders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ed8936" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ed8936" stopOpacity={0}/>
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
          <Legend />
          <Area 
            type="monotone" 
            dataKey="clients" 
            stroke="#4299e1" 
            fillOpacity={1} 
            fill="url(#colorClients)"
            name="Clients"
            stackId="1"
          />
          <Area 
            type="monotone" 
            dataKey="providers" 
            stroke="#ed8936" 
            fillOpacity={1} 
            fill="url(#colorProviders)"
            name="Prestataires"
            stackId="1"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserRegistrationsChart;
