import { useState } from 'react';

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
        const r = interestRate; // Tasa de interés mensual
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
                let altPayment = monthlyPayment * (1 + addPercentajePayment / 100);
                if (altBalance * (1 + r) < altPayment) {
                    altPayment = altBalance * (1 + r);
                }
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

            if (altBalance <= 0) {
                addPercentajePayment = 0;
            }
        }

        setPayments(paymentSchedule); // Actualiza el estado
        return paymentSchedule; // Devuelve el array de pagos
    };

    return { payments, calculatePayments };
};