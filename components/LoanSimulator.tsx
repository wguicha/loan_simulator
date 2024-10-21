'use client';

import React, { useState } from 'react';
import { useLoanCalculator } from './useLoanCalculator'; // Importamos el custom hook
import styles from './LoanSimulator.module.css'; // Importamos los estilos

import { useSelector, useDispatch } from 'react-redux';
import { setPayments } from '@/store/loanSlice';
import { RootState } from '@/store';

const LoanSimulator: React.FC = () => {
    const [amount, setAmount] = useState<number>(0);
    const [interestRate, setInterestRate] = useState<number>(0);
    const [term, setTerm] = useState<number>(0);
    const [addPercentajePayment, setAddPercentajePayment] = useState<number>(0);

    const dispatch = useDispatch();
    const totalInterest = useSelector((state: RootState) => state.loan.totalInterest);
    const totalAltInterest = useSelector((state: RootState) => state.loan.totalAltInterest);
    const totalPayment = useSelector((state: RootState) => state.loan.totalPayment);
    const totalAltPayment = useSelector((state: RootState) => state.loan.totalAltPayment);
    const payments = useSelector((state: RootState) => state.loan.payments);

    // Usamos el hook para acceder a la lógica
    const { calculatePayments, exportToExcel } = useLoanCalculator();

    const handleCalculatePayments = () => {
        const calculatedPayments = calculatePayments(amount, interestRate, term, addPercentajePayment);
        console.log(calculatedPayments)
        dispatch(setPayments(calculatedPayments)); // Despacha el array de pagos calculados
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Loan Simulator</h1>

            <div>
                <label className={styles.label}>Loan Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className={styles.input}
                />
            </div>

            <div>
                <label className={styles.label}>Annual Interest Rate (%):</label>
                <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className={styles.input}
                />
            </div>

            <div>
                <label className={styles.label}>Term (months):</label>
                <input
                    type="number"
                    value={term}
                    onChange={(e) => setTerm(Number(e.target.value))}
                    className={styles.input}
                />
            </div>
            <div>
                <label className={styles.label}>Additional Payment (%):</label>
                <input
                    type="number"
                    value={addPercentajePayment}
                    onChange={(e) => setAddPercentajePayment(Number(e.target.value))}
                    className={styles.input}
                />
            </div>

            <button onClick={handleCalculatePayments} className={styles.button}>
                Calculate Payments
            </button>

            {totalInterest > 0 && (
                <h2>Total Interest: {totalInterest.toFixed(2)} Total Payment: {totalPayment.toFixed(2)}</h2>
            )}
            {totalAltInterest > 0 && (
                <h2>New Total Interest: {totalAltInterest.toFixed(2)} New Total Payment: {totalAltPayment.toFixed(2)}</h2>
            )}
            {payments.length > 0 && (
                <>
                    <div className={styles.tableContainer}>
                        <h2>Payment Schedule</h2>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th className={styles.th}>Month</th>
                                    <th className={styles.th}>Payment</th>
                                    <th className={styles.th}>Principal</th>
                                    <th className={styles.th}>Interest</th>
                                    <th className={styles.th}>Balance</th>
                                    {/* Mostrar la columna solo si addPercentajePayment > 0 */}
                                    {addPercentajePayment > 0 && (
                                        <th className={styles.th}>Alt Interest</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment, index) => (
                                    <tr key={payment.month} className={index % 2 === 0 ? styles.evenRow : ''}>
                                        <td className={styles.td}>{payment.month}</td>
                                        <td className={styles.td}>{payment.payment.toFixed(2)}</td>
                                        <td className={styles.td}>{payment.principal.toFixed(2)}</td>
                                        <td className={styles.td}>{payment.interest.toFixed(2)}</td>
                                        <td className={styles.td}>{payment.balance.toFixed(2)}</td>
                                        {/* Mostrar la celda solo si addPercentajePayment > 0 */}
                                        {addPercentajePayment > 0 && (
                                            <td className={styles.td}>{payment.altInterest?.toFixed(2) || 0}</td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={exportToExcel} className={styles.exportButton}>Export to Excel</button>
                </>
            )}
        </div>
    );
};

export default LoanSimulator;
