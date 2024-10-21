import { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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

export const useLoanCalculator = () => {
    const [payments, setPayments] = useState<Payment[]>([]);

    // Ahora esta función devuelve el array de pagos calculados
    const calculatePayments = (amount: number, interestRate: number, term: number, addPercentajePayment: number): Payment[] => {
        const r = interestRate / 100 / 12; // Tasa de interés mensual
        const n = term; // Número de meses
        const monthlyPayment = amount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1); // Fórmula de pago mensual
        let balance = amount;
        let altBalance = amount;

        const paymentSchedule: Payment[] = [];

        for (let i = 1; i <= n; i++) {
            const interest = balance * r;
            const principal = monthlyPayment - interest;
            balance -= principal;


            if (addPercentajePayment > 0) {
                let altPayment = monthlyPayment * (1 + addPercentajePayment / 100)
                altBalance * (1 + r) < altPayment ? altPayment = altBalance * (1 + r) : 0;
                const altInterest = altBalance * r;
                const altPrincipal = altPayment - altInterest;
                altBalance -= altPrincipal;



                paymentSchedule.push({
                    month: i,
                    payment: monthlyPayment,
                    principal: principal,
                    interest: interest,
                    balance: balance > 0 ? balance : 0,
                    altPayment: altPayment,
                    altPrincipal: altPrincipal,
                    altInterest: altInterest,
                    altBalance: altBalance > 0 ? altBalance : 0,

                });

            } else {

                paymentSchedule.push({
                    month: i,
                    payment: monthlyPayment,
                    principal: principal,
                    interest: interest,
                    balance: balance > 0 ? balance : 0,
                });
            }

            altBalance > 0 ? altBalance : addPercentajePayment = 0;

        }

        setPayments(paymentSchedule); // Actualiza el estado
        return paymentSchedule; // Devuelve el array de pagos
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(payments);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Payment Schedule');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'payment_schedule.xlsx');
    };

    return { payments, calculatePayments, exportToExcel };
};

