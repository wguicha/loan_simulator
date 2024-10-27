import React from 'react';
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
import styles from './LoanSimulator.module.css';

interface ResultsTableProps {
    payments: any[];
    addPercentajePayment: string;
}

const ResultsTable: React.FC<ResultsTableProps> = ({
    payments,
    addPercentajePayment
}) => {
    const { t } = useTranslation();

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

    return (
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
    );
};

export default ResultsTable;