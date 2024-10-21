// store/loanSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Payment {
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
    altInterest?: number;
    altPayment?: number;
}

interface LoanState {
    payments: Payment[];
    totalInterest: number;
    totalPayment: number;
    totalAltInterest: number;
    totalAltPayment: number;
}

const initialState: LoanState = {
    payments: [],
    totalInterest: 0,
    totalPayment: 0,
    totalAltInterest: 0,
    totalAltPayment: 0,
};

const loanSlice = createSlice({
    name: 'loan',
    initialState,
    reducers: {
        setPayments: (state, action: PayloadAction<Payment[]>) => {
            state.payments = action.payload;
            // Calcular el total de interés
            state.totalInterest = action.payload.reduce((acc, payment) => acc + payment.interest, 0);
            // Calcular el pago total
            state.totalPayment = action.payload.reduce((acc, payment) => acc + payment.payment, 0);
            // Calcular el total Interes del nuevo escenario
            state.totalAltInterest = action.payload.reduce((acc, payment) => acc + (payment.altInterest ?? 0), 0);
            // Calcular el pago total del nuevo escenario
            state.totalAltPayment = action.payload.reduce((acc, payment) => acc + (payment.altPayment ?? 0), 0);

        },
    },
});

export const { setPayments } = loanSlice.actions;

export default loanSlice.reducer;
