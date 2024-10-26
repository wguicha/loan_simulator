import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

interface BalanceLineChartProps {
    data: { month: number; balance: number; altBalance: number }[];
}

const BalanceLineChart: React.FC<BalanceLineChartProps> = ({ data }) => {
    return (
        <div>
            <h2>Balance Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month">
                        <Label value="Month" offset={-5} position="insideBottom" />
                    </XAxis>
                    <YAxis>
                        <Label value="Balance" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                    </YAxis>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="balance" stroke="#FF5733" /> {/* Custom color for balance line */}
                    <Line type="monotone" dataKey="altBalance" stroke="#33FF57" /> {/* Custom color for altBalance line */}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BalanceLineChart;