'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoanCalculator } from '@/hooks/useLoanCalculator';
import styles from './LoanSimulator.module.css';
import { NumericFormat } from 'react-number-format';

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
            <td className={styles.td}>
                <NumericFormat
                    value={payment.altPayment}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$ '}
                    decimalScale={2}
                    fixedDecimalScale={true}
                />
            </td>
            <td className={styles.td}>
                <NumericFormat
                    value={payment.altInterest}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$ '}
                    decimalScale={2}
                    fixedDecimalScale={true}
                />
            </td>
            <td className={styles.td}>
                <NumericFormat
                    value={payment.altPrincipal}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$ '}
                    decimalScale={2}
                    fixedDecimalScale={true}
                />
            </td>
            <td className={styles.td}>
                <NumericFormat
                    value={payment.altBalance}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$ '}
                    decimalScale={2}
                    fixedDecimalScale={true}
                />
            </td>
        </>
    );

    const balanceData = payments.map(payment => ({
        month: payment.month,
        balance: payment.balance,
        altBalance: payment.altBalance ?? 0
    }));

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title} suppressHydrationWarning>{t('loanSimulator')}</h1>
                <LanguageSwitcher />
            </div>

            <div className={styles.topContainer}>
                <div className={styles.half}>
                    <div>
                        <label htmlFor="loanAmount" className={styles.label}>{t('loanAmount')}:</label>
                        <NumericFormat
                            id="loanAmount"
                            value={amount}
                            onValueChange={(values) => setAmount(values.value)}
                            className={styles.input}
                            placeholder="0"
                            thousandSeparator={true}
                            prefix={'$ '}
                        />
                    </div>

                    <div>
                        <label htmlFor="interestRate" className={styles.label}>{t('interestRate')}:</label>
                        <NumericFormat
                            id="interestRate"
                            value={interestRate}
                            onValueChange={(values) => setInterestRate(values.value)}
                            className={styles.input}
                            placeholder="0"
                            decimalScale={2}
                            suffix="%"
                            fixedDecimalScale={true}
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
                        <NumericFormat
                            id="addPercentajePayment"
                            value={addPercentajePayment}
                            onValueChange={(values) => setAddPercentajePayment(values.value)}
                            className={styles.input}
                            placeholder="0"
                            decimalScale={2}
                            suffix="%"
                            fixedDecimalScale={true}
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
                <h2>{t('totalInterest')}: {totalInterest.toFixed(2)} {t('totalPayment')}: {totalPayment.toFixed(2)}</h2>
            )}
            {totalAltInterest > 0 && (
                <>
                    <h2>{t('newTotalInterest')}: {totalAltInterest.toFixed(2)} {t('newTotalPayment')}: {totalAltPayment.toFixed(2)}</h2>
                </>
            )}

            {payments.length > 0 && (
                <>
                    <button className={styles.exportButton} onClick={exportToExcel}>
                        {t('exportToExcel')}
                    </button>
                    <div className={styles.tableContainer}>
                        <h2>{t('paymentSchedule')}</h2>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th className={styles.th}>{t('month')}</th>
                                    <th className={styles.th}>{t('payment')}</th>
                                    <th className={styles.th}>{t('principal')}</th>
                                    <th className={styles.th}>{t('interest')}</th>
                                    <th className={styles.th}>{t('balance')}</th>
                                    {parseFloat(addPercentajePayment) > 0 && renderAdditionalColumns()}
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment, index) => (
                                    <tr key={payment.month} className={index % 2 === 0 ? styles.evenRow : ''}>
                                        <td className={styles.td}>{payment.month}</td>
                                        <td className={styles.td}>
                                            <NumericFormat
                                                value={payment.payment}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'$ '}
                                                decimalScale={2}
                                                fixedDecimalScale={true}
                                            />
                                        </td>
                                        <td className={styles.td}>
                                            <NumericFormat
                                                value={payment.principal}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'$ '}
                                                decimalScale={2}
                                                fixedDecimalScale={true}
                                            />
                                        </td>
                                        <td className={styles.td}>
                                            <NumericFormat
                                                value={payment.interest}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'$ '}
                                                decimalScale={2}
                                                fixedDecimalScale={true}
                                            />
                                        </td>
                                        <td className={styles.td}>
                                            <NumericFormat
                                                value={payment.balance}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={'$ '}
                                                decimalScale={2}
                                                fixedDecimalScale={true}
                                            />
                                        </td>
                                        {parseFloat(addPercentajePayment) > 0 && renderAdditionalCells(payment)}
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