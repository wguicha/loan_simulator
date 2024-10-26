import React from 'react';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

interface BalanceLineChartProps {
    data: { month: number; balance: number; altBalance: number }[];
}

const BalanceLineChart: React.FC<BalanceLineChartProps> = ({ data }) => {
    const { t } = useTranslation();

    return (
        <div>
            <h2>{t('balanceOverTime')}</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month">
                        <Label value={t('month')} offset={-5} position="insideBottom" />
                    </XAxis>
                    <YAxis>
                        <Label value={t('balance')} angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
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