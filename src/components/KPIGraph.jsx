import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const KPIGraph = ({ data }) => {
  return (
    <div className="h-64 w-full bg-white p-4 rounded-xl">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="formattedDate" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
          <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
          <Line type="monotone" dataKey="value" stroke="#256191" strokeWidth={4} dot={{ r: 6, fill: '#EA6D46', strokeWidth: 2, stroke: '#fff' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default KPIGraph;