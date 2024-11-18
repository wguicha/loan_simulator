"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoanCalculator } from '@/hooks/useLoanCalculator';
import useExportToExcel from '@/hooks/useExportToExcel';
import styles from './LoanSimulator.module.css';
import Image from 'next/image';

import { useSelector, useDispatch } from 'react-redux';
import { setPayments } from '@/store/loanSlice';
import { RootState } from '@/store';

import HeaderBar from '../HeaderBar/HeaderBar';
import InputField from './InputField';
import ResultsTable from '../ResultsTable/ResultsTable';
import BalanceLineChart from '../BalanceLineChart/BalanceLineChart';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import RateTypeSelector from '../RateTypeSelector/RateTypeSelector'; // Import the new component
import TopBar from '../TopBar/TopBar'; // Import the TopBar component
import Footer from '../Footer/Footer'; // Import the Footer component

const LoanSimulator: React.FC = () => {
    const [amount, setAmount] = useState<string>('');
    const [interestRate, setInterestRate] = useState<string>('');
    const [term, setTerm] = useState<string>('');
    const [addPercentajePayment, setAddPercentajePayment] = useState<string>('');
    const [rateType, setRateType] = useState<string>('TEA'); // State for the rate type
    const [calculated, setCalculated] = useState<boolean>(false); // State to track if calculation has been done
    const [error, setError] = useState<string>(''); // State for error messages

    const { t } = useTranslation();
    const { exportToExcel } = useExportToExcel();

    const dispatch = useDispatch();
    const totalPayment = useSelector((state: RootState) => state.loan.totalPayment);
    const totalAltPayment = useSelector((state: RootState) => state.loan.totalAltPayment);
    const payments = useSelector((state: RootState) => state.loan.payments);

    const { calculatePayments } = useLoanCalculator();

    const calculateMonthlyRate = useCallback((rate: number, type: string): number => {
        if (rate === 0) return 0; // Retornar 0 si la tasa de interés es 0

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
    }, []);

    const handleCalculate = useCallback(() => {
        const amountNumber = parseFloat(amount) || 0;
        const termNumber = parseInt(term) || 0;

        // Validar que el monto del préstamo y el término sean mayores a 0
        if (amountNumber <= 0 || termNumber <= 0) {
            setError(t('errorInvalidInput'));
            return;
        }

        const interestRateNumber = parseFloat(interestRate) || 0;
        const addPercentajePaymentNumber = parseFloat(addPercentajePayment) || 0;

        const monthlyRate = calculateMonthlyRate(interestRateNumber, rateType);

        const calculatedPayments = calculatePayments(amountNumber, monthlyRate, termNumber, addPercentajePaymentNumber);
        dispatch(setPayments(calculatedPayments));
        setCalculated(true); // Set calculated to true after calculation
        setError(''); // Clear error message
    }, [amount, interestRate, term, addPercentajePayment, rateType, calculateMonthlyRate, calculatePayments, dispatch, t]);

    // Reset calculated state when any input changes
    useEffect(() => {
        setCalculated(false);
    }, [amount, interestRate, term, addPercentajePayment, rateType]);

    const balanceData = useMemo(() => payments.map(payment => ({
        month: payment.month,
        balance: payment.balance,
        altBalance: payment.altBalance ?? 0
    })), [payments]);

    const totalSavings = useMemo(() => totalAltPayment > 0 && calculated ? totalPayment - totalAltPayment : 0, [totalAltPayment, calculated, totalPayment]);

    // Find the new term as the month when altBalance becomes 0
    const newTerm = useMemo(() => addPercentajePayment !== '' && calculated ? payments.find(payment => (payment.altBalance ?? 0) <= 0)?.month ?? 0 : 0, [addPercentajePayment, calculated, payments]);

    return (
        <div className={styles.container}>
            <TopBar /> {/* Add the TopBar component */}
            <HeaderBar title={t('loanSimulator')} />

            <div className={styles.topContainer}>
                <div className={styles.half}>
                    {/* Descripción del funcionamiento de la aplicación */}
                    <div className={styles.description}>
                        <h2>{t('appDescriptionTitle')}</h2>
                        <p>{t('appDescription')}</p>
                    </div>
                    {error && <div className={styles.error}>{error}</div>} {/* Mostrar mensaje de error si existe */}
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
                    {calculated ? (
                        <BalanceLineChart data={balanceData} totalSavings={totalSavings} newTerm={newTerm} />
                    ) : (
                        <div className={styles.imageContainer}>
                            <Image src="/debtcut.png" alt="Debt Cut" width={500} height={300} />
                        </div>
                    )}
                </div>
            </div>

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
            <Footer /> {/* Add the Footer component */}
        </div>
    );
};

export default LoanSimulator;