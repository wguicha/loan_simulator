import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface HorizontalBarChartProps {
    totalPayment: number;
    newTotalPayment: number;
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({ totalPayment, newTotalPayment }) => {
    const data = [
        {
            name: 'Total Payment',
            value: totalPayment,
        },
        {
            name: 'New Total Payment',
            value: newTotalPayment,
        },
    ];

    return (
        <BarChart
            width={500}
            height={300}
            data={data}
            layout="vertical"
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
    );
};

export default HorizontalBarChart;