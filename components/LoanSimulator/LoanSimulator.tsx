"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoanCalculator } from '@/hooks/useLoanCalculator';
import useExportToExcel from '@/hooks/useExportToExcel';
import styles from './LoanSimulator.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { setPayments } from '@/store/loanSlice';
import { RootState } from '@/store';

import HeaderBar from './HeaderBar';
import InputField from './InputField';
import ResultsTable from '../ResultsTable/ResultsTable';
import HorizontalBarChart from '../HorizontalBarChart/HorizontalBarChart';
import BalanceLineChart from '../BalanceLineChart/BalanceLineChart';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import RateTypeSelector from '../RateTypeSelector/RateTypeSelector'; // Import the new component

const LoanSimulator: React.FC = () => {
    const [amount, setAmount] = useState<string>('');
    const [interestRate, setInterestRate] = useState<string>('');
    const [term, setTerm] = useState<string>('');
    const [addPercentajePayment, setAddPercentajePayment] = useState<string>('');
    const [rateType, setRateType] = useState<string>('TEA'); // State for the rate type
    const [calculated, setCalculated] = useState<boolean>(false); // State to track if calculation has been done

    const { t } = useTranslation();
    const { exportToExcel } = useExportToExcel();

    const dispatch = useDispatch();
    const totalInterest = useSelector((state: RootState) => state.loan.totalInterest);
    const totalAltInterest = useSelector((state: RootState) => state.loan.totalAltInterest);
    const totalPayment = useSelector((state: RootState) => state.loan.totalPayment);
    const totalAltPayment = useSelector((state: RootState) => state.loan.totalAltPayment);
    const payments = useSelector((state: RootState) => state.loan.payments);

    const { calculatePayments } = useLoanCalculator();

    const calculateMonthlyRate = (rate: number, type: string): number => {
        switch (type) {
            case 'TEA':
                return Math.pow(1 + rate / 100, 1 / 12) - 1;
            case 'TNA':
                return rate / 12 / 100;
            case 'TM':
                return rate / 100;
            default:
                return rate / 100;
        }
    };

    const handleCalculate = () => {
        const amountNumber = parseFloat(amount) || 0;
        const interestRateNumber = parseFloat(interestRate) || 0;
        const termNumber = parseInt(term) || 0;
        const addPercentajePaymentNumber = parseFloat(addPercentajePayment) || 0;

        const monthlyRate = calculateMonthlyRate(interestRateNumber, rateType);

        const calculatedPayments = calculatePayments(amountNumber, monthlyRate, termNumber, addPercentajePaymentNumber);
        dispatch(setPayments(calculatedPayments));
        setCalculated(true); // Set calculated to true after calculation
    };

    // Reset calculated state when any input changes
    useEffect(() => {
        setCalculated(false);
    }, [amount, interestRate, term, addPercentajePayment, rateType]);

    const balanceData = payments.map(payment => ({
        month: payment.month,
        balance: payment.balance,
        altBalance: payment.altBalance ?? 0
    }));

    const totalSavings = totalPayment - totalAltPayment;

    // Find the new term as the month when altBalance becomes 0
    const newTerm = payments.find(payment => (payment.altBalance ?? 0) <= 0)?.month || payments.length;

    return (
        <div className={styles.container}>
            <HeaderBar title={t('loanSimulator')} />
            <LanguageSwitcher /> {/* Asegúrate de usar el componente aquí */}

            <div className={styles.topContainer}>
                <div className={styles.half}>
                    <InputField
                        id="loanAmount"
                        label={t('loanAmount')}
                        value={amount}
                        onValueChange={(values) => setAmount(values.value)}
                        placeholder="0"
                        thousandSeparator={true}
                        prefix={'$ '}
                        tooltip={t('loanAmountTooltip')} // Texto explicativo
                    />
                    <InputField
                        id="interestRate"
                        label={t('interestRate')}
                        value={interestRate}
                        onValueChange={(values) => setInterestRate(values.value)}
                        placeholder="0"
                        decimalScale={2}
                        suffix="%"
                        fixedDecimalScale={true}
                        tooltip={t('interestRateTooltip')} // Texto explicativo
                    >
                        <RateTypeSelector
                            selectedRateType={rateType}
                            onRateTypeChange={setRateType}
                        />
                    </InputField>
                    <InputField
                        id="term"
                        label={t('term')}
                        value={term}
                        onValueChange={(values) => setTerm(values.value)}
                        placeholder="0"
                        tooltip={t('termTooltip')} // Texto explicativo
                    />
                    <InputField
                        id="addPercentajePayment"
                        label={t('addPercentajePayment')}
                        value={addPercentajePayment}
                        onValueChange={(values) => setAddPercentajePayment(values.value)}
                        placeholder="0"
                        decimalScale={2}
                        suffix="%"
                        fixedDecimalScale={true}
                        tooltip={t('addPercentajePaymentTooltip')} // Texto explicativo
                    />
                    <button className={styles.button} onClick={handleCalculate}>
                        {t('calculate')}
                    </button>
                </div>

                <div className={styles.half}>
                    <BalanceLineChart data={balanceData} totalSavings={totalSavings} newTerm={newTerm} />
                </div>
            </div>

            {calculated && totalInterest > 0 && (
                <h2>{t('totalInterest')}: {totalInterest.toFixed(2)} {t('totalPayment')}: {totalPayment.toFixed(2)}</h2>
            )}
            {calculated && totalAltInterest > 0 && (
                <>
                    <h2>{t('newTotalInterest')}: {totalAltInterest.toFixed(2)} {t('newTotalPayment')}: {totalAltPayment.toFixed(2)}</h2>
                </>
            )}

            {calculated && payments.length > 0 && (
                <>
                    <button className={styles.exportButton} onClick={() => exportToExcel(payments, addPercentajePayment)}>
                        {t('exportToExcel')}
                    </button>
                    <ResultsTable
                        payments={payments}
                        addPercentajePayment={addPercentajePayment}
                    />
                </>
            )}
        </div>
    );
};

export default LoanSimulator;