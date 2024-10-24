import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "loanAmount": "Loan Amount",
            "interestRate": "Annual Interest Rate (%)",
            "termMonths": "Term (months)",
            "additionalPayment": "Additional Payment (%)",
            "calculatePayments": "Calculate Payments",
            "totalPayment": "Total Payment",
            "newTotalPayment": "New Total Payment",
            "totalInterest": "Total Interest",
            "newTotalInterest": "New Total Interest",
            "paymentSchedule": "Payment Schedule",
            "month": "Month",
            "payment": "Payment",
            "principal": "Principal",
            "interest": "Interest",
            "balance": "Balance",
            "newPayment": "New Payment",
            "newPrincipal": "New Principal",
            "newInterest": "New Interest",
            "newBalance": "New Balance",
            "loanSimulator": "Loan Simulator"
        }
    },
    es: {
        translation: {
            "loanAmount": "Monto del Préstamo",
            "interestRate": "Tasa de Interés Anual (%)",
            "termMonths": "Plazo (meses)",
            "additionalPayment": "Pago Adicional (%)",
            "calculatePayments": "Calcular Pagos",
            "totalPayment": "Pago Total",
            "newTotalPayment": "Nuevo Pago Total",
            "totalInterest": "Interés Total",
            "newTotalInterest": "Nuevo Interés Total",
            "paymentSchedule": "Calendario de Pagos",
            "month": "Mes",
            "payment": "Pago",
            "principal": "Capital",
            "interest": "Interés",
            "balance": "Saldo",
            "newPayment": "Nuevo Pago",
            "newPrincipal": "Nuevo Capital",
            "newInterest": "Nuevo Interés",
            "newBalance": "Nuevo Saldo",
            "loanSimulator": "Simulador de Préstamo"
        }
    },
    pt: {
        translation: {
            "loanAmount": "Montante do Empréstimo",
            "interestRate": "Taxa de Juros Anual (%)",
            "termMonths": "Prazo (meses)",
            "additionalPayment": "Pagamento Adicional (%)",
            "calculatePayments": "Calcular Pagamentos",
            "totalPayment": "Pagamento Totais",
            "newTotalPayment": "Novo Pagamento Totais",
            "totalInterest": "Juros Totais",
            "newTotalInterest": "Novos Juros Totais",
            "paymentSchedule": "Calendário de Pagamentos",
            "month": "Mês",
            "payment": "Pagamento",
            "principal": "Principal",
            "interest": "Juros",
            "balance": "Saldo",
            "newPayment": "Novo Pagamento",
            "newPrincipal": "Novo Principal",
            "newInterest": "Novo Juros",
            "newBalance": "Novo Saldo",
            "loanSimulator": "Simulador do Empréstimo"
        }
    }
};

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false, // React ya escapa valores por defecto
        },
    });

export default i18n;
