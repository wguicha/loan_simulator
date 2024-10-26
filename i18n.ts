import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "addPercentajePayment": "Additional Percentage Payment",
            "balance": "Balance",
            "balanceOverTime": "Balance Over Time",
            "calculate": "Calculate",
            "exportToExcel": "Export to Excel",
            "interest": "Interest",
            "interestRate": "Interest Rate",
            "loanAmount": "Loan Amount",
            "loanSimulator": "Loan Simulator",
            "month": "Month",
            "newBalance": "New Balance",
            "newInterest": "New Interest",
            "newPayment": "New Payment",
            "newPrincipal": "New Principal",
            "payment": "Payment",
            "paymentSchedule": "Payment Schedule",
            "principal": "Principal",
            "term": "Term"
        }
    },
    es: {
        translation: {
            "addPercentajePayment": "Pago Adicional en Porcentaje",
            "balance": "Saldo",
            "balanceOverTime": "Saldo a lo Largo del Tiempo",
            "calculate": "Calcular",
            "exportToExcel": "Exportar a Excel",
            "interest": "Interés",
            "interestRate": "Tasa de Interés",
            "loanAmount": "Monto del Préstamo",
            "loanSimulator": "Simulador de Préstamos",
            "month": "Mes",
            "newBalance": "Nuevo Saldo",
            "newInterest": "Nuevo Interés",
            "newPayment": "Nuevo Pago",
            "newPrincipal": "Nuevo Principal",
            "payment": "Pago",
            "paymentSchedule": "Calendario de Pagos",
            "principal": "Principal",
            "term": "Plazo"
        }
    },
    pt: {
        translation: {
            "addPercentajePayment": "Pagamento Adicional em Percentagem",
            "balance": "Saldo",
            "balanceOverTime": "Saldo ao Longo do Tempo",
            "calculate": "Calcular",
            "exportToExcel": "Exportar para Excel",
            "interest": "Juros",
            "interestRate": "Taxa de Juros",
            "loanAmount": "Montante do Empréstimo",
            "loanSimulator": "Simulador de Empréstimos",
            "month": "Mês",
            "newBalance": "Novo Saldo",
            "newInterest": "Novo Juros",
            "newPayment": "Novo Pagamento",
            "newPrincipal": "Novo Principal",
            "payment": "Pagamento",
            "paymentSchedule": "Calendário de Pagamentos",
            "principal": "Principal",
            "term": "Prazo"
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
            escapeValue: false
        }
    });

export default i18n;