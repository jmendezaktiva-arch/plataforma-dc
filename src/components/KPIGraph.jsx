// src/components/KPIGraph.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const KPIGraph = ({ data, type }) => {
  // Colores corporativos Dreams
  const colors = {
    lead: { line: '#256191', dot: '#EA6D46' }, // Azul con punto Naranja
    lag: { line: '#EA6D46', dot: '#256191' }   // Naranja con punto Azul
  };

  const currentTheme = colors[type] || colors.lead;

  return (
    <div className="h-64 w-full bg-white p-4 rounded-xl">
      {/* CORREGIDO: Comillas cerradas en width="100%" */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="formattedDate" 
            axisLine={false} 
            tickLine={false} 
            tick={{fontSize: 10, fill: '#9ca3af'}} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fontSize: 10, fill: '#9ca3af'}} 
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '12px', 
              border: 'none', 
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              fontFamily: 'Montserrat'
            }} 
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={currentTheme.line} 
            strokeWidth={4} 
            dot={{ 
              r: 5, 
              fill: currentTheme.dot, 
              strokeWidth: 2, 
              stroke: '#fff' 
            }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default KPIGraph;