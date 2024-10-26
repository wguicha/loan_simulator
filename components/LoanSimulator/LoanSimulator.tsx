'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoanCalculator } from '@/hooks/useLoanCalculator';
import styles from './LoanSimulator.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { setPayments } from '@/store/loanSlice';
import { RootState } from '@/store';

import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import HorizontalBarChart from '../HorizontalBarChart/HorizontalBarChart';
import BalanceLineChart from '../BalanceLineChart/BalanceLineChart';

const LoanSimulator: React.FC = () => {
    const [amount, setAmount] = useState<string>('');
    const [interestRate, setInterestRate] = useState<string>('');
    const [term, setTerm] = useState<string>('');
    const [addPercentajePayment, setAddPercentajePayment] = useState<string>('');

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const totalInterest = useSelector((state: RootState) => state.loan.totalInterest);
    const totalAltInterest = useSelector((state: RootState) => state.loan.totalAltInterest);
    const totalPayment = useSelector((state: RootState) => state.loan.totalPayment);
    const totalAltPayment = useSelector((state: RootState) => state.loan.totalAltPayment);
    const payments = useSelector((state: RootState) => state.loan.payments);

    const { calculatePayments, exportToExcel } = useLoanCalculator();

    const handleCalculate = () => {
        const amountNumber = parseFloat(amount) || 0;
        const interestRateNumber = parseFloat(interestRate) || 0;
        const termNumber = parseInt(term) || 0;
        const addPercentajePaymentNumber = parseFloat(addPercentajePayment) || 0;

        const calculatedPayments = calculatePayments(amountNumber, interestRateNumber, termNumber, addPercentajePaymentNumber);
        dispatch(setPayments(calculatedPayments));
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
            <td className={styles.td}>{payment.altPayment ? payment.altPayment.toFixed(2) : '0.00'}</td>
            <td className={styles.td}>{payment.altInterest ? payment.altInterest.toFixed(2) : '0.00'}</td>
            <td className={styles.td}>{payment.altPrincipal ? payment.altPrincipal.toFixed(2) : '0.00'}</td>
            <td className={styles.td}>{payment.altBalance ? payment.altBalance.toFixed(2) : '0.00'}</td>
        </>
    );

    const balanceData = payments.map(payment => ({
        month: payment.month,
        balance: payment.balance,
        altBalance: payment.altBalance ?? 0
    }));

    //<HorizontalBarChart totalPayment={totalPayment} newTotalPayment={totalAltPayment} />
    return (
        <div className={styles.container}>
            <LanguageSwitcher />
            <h1 className={styles.title} suppressHydrationWarning>{t('loanSimulator')}</h1>

            <div className={styles.topContainer}>
                <div className={styles.half}>
                    <div>
                        <label htmlFor="loanAmount" className={styles.label}>{t('loanAmount')}:</label>
                        <input
                            id="loanAmount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className={styles.input}
                            placeholder="0"
                        />
                    </div>

                    <div>
                        <label htmlFor="interestRate" className={styles.label}>{t('interestRate')}:</label>
                        <input
                            id="interestRate"
                            type="number"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                            className={styles.input}
                            placeholder="0"
                        />
                    </div>

                    <div>
                        <label htmlFor="term" className={styles.label}>{t('term')}:</label>
                        <input
                            id="term"
                            type="number"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                            className={styles.input}
                            placeholder="0"
                        />
                    </div>

                    <div>
                        <label htmlFor="addPercentajePayment" className={styles.label}>{t('addPercentajePayment')}:</label>
                        <input
                            id="addPercentajePayment"
                            type="number"
                            value={addPercentajePayment}
                            onChange={(e) => setAddPercentajePayment(e.target.value)}
                            className={styles.input}
                            placeholder="0"
                        />
                    </div>

                    <button className={styles.button} onClick={handleCalculate}>
                        {t('calculate')}
                    </button>
                </div>

                <div className={styles.half}>
                    <BalanceLineChart data={balanceData} />
                </div>
            </div>

            {totalInterest > 0 && (
                <h2>Total Interest: {totalInterest.toFixed(2)} Total Payment: {totalPayment.toFixed(2)}</h2>
            )}
            {totalAltInterest > 0 && (
                <h2>New Total Interest: {totalAltInterest.toFixed(2)} New Total Payment: {totalAltPayment.toFixed(2)}</h2>
            )}

            <button className={styles.exportButton} onClick={exportToExcel}>
                {t('exportToExcel')}
            </button>

            {payments.length > 0 && (
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
                                {parseFloat(addPercentajePayment) > 0 && renderAdditionalColumns()}
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
                                    {parseFloat(addPercentajePayment) > 0 && renderAdditionalCells(payment)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default LoanSimulator;