import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
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
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(0);
    const paymentsPerPage = 20;

    // Calculate the current payments to display
    const indexOfLastPayment = (currentPage + 1) * paymentsPerPage;
    const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
    const currentPayments = payments.slice(indexOfFirstPayment, indexOfLastPayment);

    // Change page
    const handlePageClick = (data: { selected: number }) => {
        setCurrentPage(data.selected);
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(value);
    };

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>{t('month')}</th>
                        <th>{t('payment')}</th>
                        <th>{t('principal')}</th>
                        <th>{t('interest')}</th>
                        <th>{t('balance')}</th>
                        {addPercentajePayment && <th>{t('newPayment')}</th>}
                        {addPercentajePayment && <th>{t('newPrincipal')}</th>}
                        {addPercentajePayment && <th>{t('newInterest')}</th>}
                        {addPercentajePayment && <th>{t('newBalance')}</th>}
                    </tr>
                </thead>
                <tbody>
                    {currentPayments.map((payment, index) => (
                        <tr key={index}>
                            <td data-label={t('month')}>{payment.month}</td>
                            <td data-label={t('payment')} className={styles.rightAlign}>{formatCurrency(payment.payment)}</td>
                            <td data-label={t('principal')} className={styles.rightAlign}>{formatCurrency(payment.principal)}</td>
                            <td data-label={t('interest')} className={styles.rightAlign}>{formatCurrency(payment.interest)}</td>
                            <td data-label={t('balance')} className={styles.rightAlign}>{formatCurrency(payment.balance)}</td>
                            {addPercentajePayment && <td data-label={t('newPayment')} className={styles.rightAlign}>{payment.altPayment ? formatCurrency(payment.altPayment) : ''}</td>}
                            {addPercentajePayment && <td data-label={t('newPrincipal')} className={styles.rightAlign}>{payment.altPrincipal ? formatCurrency(payment.altPrincipal) : ''}</td>}
                            {addPercentajePayment && <td data-label={t('newInterest')} className={styles.rightAlign}>{payment.altInterest ? formatCurrency(payment.altInterest) : ''}</td>}
                            {addPercentajePayment && <td data-label={t('newBalance')} className={styles.rightAlign}>{payment.altBalance ? formatCurrency(payment.altBalance) : ''}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={Math.ceil(payments.length / paymentsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={styles.pagination}
                activeClassName={styles.active}
            />
        </div>
    );
};

export default ResultsTable;