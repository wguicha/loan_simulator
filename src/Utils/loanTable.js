const loanTable = () =>{
    const termLength = 60;
    const interestRate = 1.1;
    const loanAmount = 40000;
    const amortizationTable=[];
    const addPayment={5 : 300, 10 : 300 }
    let addPaymentInPeriod = 0
    let intialValuePeriod = loanAmount

    let monthlyPay = monthlyPayment(termLength, interestRate, loanAmount);

    console.log('Pago Mensual: ', monthlyPay)

    for (let i = 1; i <= termLength; i++){
        if(addPayment[i]){
            addPaymentInPeriod = addPayment[i]
        } else {
            addPaymentInPeriod = 0
        }
        amortizationTable.push(
            {
                periodo : i,
                vInicial : intialValuePeriod,
                interesMes : Math.round(intialValuePeriod * interestRate) / 100,
                capital : Math.round((monthlyPay - (Math.round(intialValuePeriod * interestRate) / 100)) * 100) / 100,
                vFinal : Math.round((intialValuePeriod - (Math.round((monthlyPay - (Math.round(intialValuePeriod * interestRate) / 100)) * 100) / 100)) * 100) / 100,
                addPaymentInPeriod : addPaymentInPeriod,
                newVFinal : Math.round((intialValuePeriod - (Math.round((monthlyPay - (Math.round(intialValuePeriod * interestRate) / 100)) * 100) / 100)) * 100) / 100 - addPaymentInPeriod
            }
        )

        intialValuePeriod = Math.round((intialValuePeriod - (Math.round((monthlyPay - (Math.round(intialValuePeriod * interestRate) / 100)) * 100) / 100)) * 100) / 100 - addPaymentInPeriod;

    }

    console.log(amortizationTable)

    return amortizationTable;

}

const monthlyPayment = (termLength, interestRate, loanAmount) => {

    return Math.round(((loanAmount * (interestRate/100))/(1 - Math.pow((1 + (interestRate/100)),(-termLength))))*100) / 100;

}

loanTable();

export default loanTable;