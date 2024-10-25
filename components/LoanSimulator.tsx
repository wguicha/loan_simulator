'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import HorizontalBarChart from './HorizontalBarChart';
import { useLoanCalculator } from './useLoanCalculator';
import styles from './LoanSimulator.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { setPayments } from '@/store/loanSlice';
import { RootState } from '@/store';

import LanguageSwitcher from "@/components/LanguageSwitcher";

const LoanSimulator: React.FC = () => {
    const [amount, setAmount] = useState<number>(0);
    const [interestRate, setInterestRate] = useState<number>(0);
    const [term, setTerm] = useState<number>(0);
    const [addPercentajePayment, setAddPercentajePayment] = useState<number>(0);

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const totalInterest = useSelector((state: RootState) => state.loan.totalInterest);
    const totalAltInterest = useSelector((state: RootState) => state.loan.totalAltInterest);
    const totalPayment = useSelector((state: RootState) => state.loan.totalPayment);
    const totalAltPayment = useSelector((state: RootState) => state.loan.totalAltPayment);
    const payments = useSelector((state: RootState) => state.loan.payments);

    const { calculatePayments, exportToExcel } = useLoanCalculator();

    const handleCalculatePayments = () => {
        const calculatedPayments = calculatePayments(amount, interestRate, term, addPercentajePayment);
        console.log(calculatedPayments);
        dispatch(setPayments(calculatedPayments)); // Despacha el array de pagos calculados
    };

    const renderAdditionalColumns = () => (
        <>
            <th className={styles.th}>{t('newPayment')}</th>
            <th className={styles.th}>{t('newInterest')}</th>
            <th className={styles.th}>{t('newPrincipal')}</th>
            <th className={styles.th}>{t('newBalance')}</th>
        </>
    );

    const renderAdditionalCells = (payment: any) => (
        <>
            <td className={styles.td}>{payment.altPayment?.toFixed(2) || 0}</td>
            <td className={styles.td}>{payment.altInterest?.toFixed(2) || 0}</td>
            <td className={styles.td}>{payment.altPrincipal?.toFixed(2) || 0}</td>
            <td className={styles.td}>{payment.altBalance?.toFixed(2) || 0}</td>
        </>
    );

    return (
        <div className={styles.container}>
            <LanguageSwitcher />
            <h1 className={styles.title}>{t('loanSimulator')}</h1>

            <div>
                <label className={styles.label}>{t('loanAmount')}:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className={styles.input}
                />
            </div>

            <div>
                <label className={styles.label}>{t('interestRate')}:</label>
                <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className={styles.input}
                />
            </div>

            <div>
                <label className={styles.label}>{t('termMonths')}:</label>
                <input
                    type="number"
                    value={term}
                    onChange={(e) => setTerm(Number(e.target.value))}
                    className={styles.input}
                />
            </div>
            <div>
                <label className={styles.label}>{t('additionalPayment')}:</label>
                <input
                    type="number"
                    value={addPercentajePayment}
                    onChange={(e) => setAddPercentajePayment(Number(e.target.value))}
                    className={styles.input}
                />
            </div>

            <button onClick={handleCalculatePayments} className={styles.button}>
                {t('calculatePayments')}
            </button>

            {totalInterest > 0 && (
                <h2>Total Interest: {totalInterest.toFixed(2)} Total Payment: {totalPayment.toFixed(2)}</h2>
            )}
            {totalAltInterest > 0 && (
                <>
                    <h2>New Total Interest: {totalAltInterest.toFixed(2)} New Total Payment: {totalAltPayment.toFixed(2)}</h2>
                    <HorizontalBarChart totalPayment={totalPayment} newTotalPayment={totalAltPayment} />
                </>
            )}

            <button onClick={exportToExcel} className={styles.exportButton}>Export to Excel</button>

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
                                    {addPercentajePayment > 0 && renderAdditionalColumns()}
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
                                        {addPercentajePayment > 0 && renderAdditionalCells(payment)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default LoanSimulator;