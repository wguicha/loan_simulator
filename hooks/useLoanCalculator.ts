import { useState } from 'react';

export interface Payment {
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
    altBalance?: number;
}

export const useLoanCalculator = () => {
    const [payments, setPayments] = useState<Payment[]>([]);

    // Ahora esta función devuelve el array de pagos calculados
    const calculatePayments = (amount: number, interestRate: number, term: number, addPercentajePayment: number): Payment[] => {
        const r = interestRate; // Tasa de interés mensual
        const n = term; // Número de meses
        const monthlyPayment = r === 0 ? amount / n : amount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1); // Fórmula de pago mensual
        let balance = amount;
        let altBalance = amount;

        const paymentSchedule: Payment[] = [];

        for (let i = 1; i <= n; i++) {
            const interestPayment = r === 0 ? 0 : balance * r;
            const principalPayment = monthlyPayment - interestPayment;
            balance -= principalPayment;

            const altInterestPayment = r === 0 ? 0 : altBalance * r;
            const altPrincipalPayment = monthlyPayment + (monthlyPayment * addPercentajePayment / 100) - altInterestPayment;
            altBalance -= altPrincipalPayment;

            paymentSchedule.push({
                month: i,
                payment: monthlyPayment,
                principal: principalPayment,
                interest: interestPayment,
                balance: balance,
                altBalance: altBalance > 0 ? altBalance : 0,
            });

            if (altBalance <= 0) break;
        }

        setPayments(paymentSchedule);
        return paymentSchedule;
    };

    return { payments, calculatePayments };
};