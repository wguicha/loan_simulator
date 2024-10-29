import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';

const useExportToExcel = () => {
    const { t } = useTranslation();

    const exportToExcel = (payments: any[], addPercentajePayment: string) => {
        // Crear los datos de la hoja de trabajo
        const worksheetData = [
            [
                t('month'),
                t('payment'),
                t('principal'),
                t('interest'),
                t('balance'),
                parseFloat(addPercentajePayment) > 0 ? t('newPayment') : '',
                parseFloat(addPercentajePayment) > 0 ? t('newInterest') : '',
                parseFloat(addPercentajePayment) > 0 ? t('newPrincipal') : '',
                parseFloat(addPercentajePayment) > 0 ? t('newBalance') : ''
            ].filter(Boolean), // Filtra las columnas vacías
            ...payments.map(payment => [
                payment.month,
                payment.payment,
                payment.principal,
                payment.interest,
                payment.balance,
                parseFloat(addPercentajePayment) > 0 ? payment.altPayment : '',
                parseFloat(addPercentajePayment) > 0 ? payment.altInterest : '',
                parseFloat(addPercentajePayment) > 0 ? payment.altPrincipal : '',
                parseFloat(addPercentajePayment) > 0 ? payment.altBalance : ''
            ].filter(Boolean)) // Filtra las celdas vacías
        ];

        // Agregar fórmulas para el total de las columnas
        const totalRow = [
            t('total'),
            { f: `SUM(B2:B${payments.length + 1})` },
            { f: `SUM(C2:C${payments.length + 1})` },
            { f: `SUM(D2:D${payments.length + 1})` },
            { f: `SUM(E2:E${payments.length + 1})` },
            parseFloat(addPercentajePayment) > 0 ? { f: `SUM(F2:F${payments.length + 1})` } : '',
            parseFloat(addPercentajePayment) > 0 ? { f: `SUM(G2:G${payments.length + 1})` } : '',
            parseFloat(addPercentajePayment) > 0 ? { f: `SUM(H2:H${payments.length + 1})` } : '',
            parseFloat(addPercentajePayment) > 0 ? { f: `SUM(I2:I${payments.length + 1})` } : ''
        ].filter(Boolean); // Filtra las celdas vacías

        worksheetData.push(totalRow);

        // Crear la hoja de trabajo de Excel
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

        // Aplicar formato de moneda a las celdas
        const currencyFormat = '$#,##0.00';
        const range = XLSX.utils.decode_range(worksheet['!ref']!);
        for (let C = 1; C <= range.e.c; ++C) {
            for (let R = 1; R <= range.e.r; ++R) {
                const cell_address = { c: C, r: R };
                const cell_ref = XLSX.utils.encode_cell(cell_address);
                if (!worksheet[cell_ref]) continue;
                worksheet[cell_ref].z = currencyFormat;
            }
        }

        // Crear el libro de trabajo de Excel
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Payments');
        XLSX.writeFile(workbook, 'loan_payments.xlsx');
    };

    return { exportToExcel };
};

export default useExportToExcel;