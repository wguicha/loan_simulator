import React from 'react';
import styles from './ResultsTable.module.css';

interface Payment {
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
    altPayment?: number;
    altPrincipal?: number;
    altInterest?: number;
    altBalance?: number;
}

interface ResultsTableProps {
    payments: Payment[];
    addPercentajePayment: string;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ payments, addPercentajePayment }) => {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Payment</th>
                        <th>Principal</th>
                        <th>Interest</th>
                        <th>Balance</th>
                        {addPercentajePayment && <th>Alt Payment</th>}
                        {addPercentajePayment && <th>Alt Principal</th>}
                        {addPercentajePayment && <th>Alt Interest</th>}
                        {addPercentajePayment && <th>Alt Balance</th>}
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => (
                        <tr key={index}>
                            <td data-label="Month">{payment.month}</td>
                            <td data-label="Payment">{payment.payment.toFixed(2)}</td>
                            <td data-label="Principal">{payment.principal.toFixed(2)}</td>
                            <td data-label="Interest">{payment.interest.toFixed(2)}</td>
                            <td data-label="Balance">{payment.balance.toFixed(2)}</td>
                            {addPercentajePayment && <td data-label="Alt Payment">{payment.altPayment?.toFixed(2)}</td>}
                            {addPercentajePayment && <td data-label="Alt Principal">{payment.altPrincipal?.toFixed(2)}</td>}
                            {addPercentajePayment && <td data-label="Alt Interest">{payment.altInterest?.toFixed(2)}</td>}
                            {addPercentajePayment && <td data-label="Alt Balance">{payment.altBalance?.toFixed(2)}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsTable;