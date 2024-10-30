import React from 'react';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import styles from './BalanceLineChart.module.css'; // Import CSS module

interface BalanceLineChartProps {
    data: { month: number; balance: number; altBalance: number }[];
    totalSavings: number; // Add totalSavings prop
    newTerm: number; // Add newTerm prop
}

const BalanceLineChart: React.FC<BalanceLineChartProps> = ({ data, totalSavings, newTerm }) => {
    const { t } = useTranslation();

    return (
        <div>
            <h2>{t('balanceOverTime')}</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month">
                        <Label value={t('month')} offset={-5} position="insideBottom" />
                    </XAxis>
                    <YAxis>
                        <Label value={t('balance')} angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                    </YAxis>
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} /> {/* Move legend to the top */}
                    <Line type="monotone" dataKey="balance" stroke="#FF5733" dot={false} name={t('balance')} /> {/* Custom color for balance line */}
                    <Line type="monotone" dataKey="altBalance" stroke="#33FF57" dot={false} name={t('newBalance')} /> {/* Custom color for altBalance line */}
                </LineChart>
            </ResponsiveContainer>
            {totalSavings > 0 && (
                <div className={styles.savingsIndicator}>
                    <div className={styles.savingsLabel}>{t('totalSavings')}</div>
                    <div className={styles.savingsValue}>${totalSavings.toFixed(2)}</div>
                </div>
            )}
            {newTerm > 0 && (
                <div className={styles.termIndicator}>
                    <div className={styles.termLabel}>{t('newTerm')}</div>
                    <div className={styles.termValue}>{newTerm} {t('months')}</div>
                </div>
            )}
        </div>
    );
};

export default BalanceLineChart;