const loanTable = () =>{
    const plazo = 60;
    const tasaMensual = 1.1;
    const valorInicial = 40000;
    const tablaAmortizacion=[];
    let valorInicialPer = valorInicial

    let monthlyPay = monthlyPayment(plazo, tasaMensual, valorInicial);

    console.log('Pago Mensual: ', monthlyPay)

    for (let i = 1; i <= plazo; i++){
        tablaAmortizacion.push(
            {
                periodo : i,
                vInicial : valorInicialPer,
                interesMes : Math.round(valorInicialPer * tasaMensual) / 100,
                capital : Math.round((monthlyPay - (Math.round(valorInicialPer * tasaMensual) / 100)) * 100) / 100,
                vFinal : Math.round((valorInicialPer - (Math.round((monthlyPay - (Math.round(valorInicialPer * tasaMensual) / 100)) * 100) / 100)) * 100) / 100
            }
        )

        valorInicialPer = Math.round((valorInicialPer - (Math.round((monthlyPay - (Math.round(valorInicialPer * tasaMensual) / 100)) * 100) / 100)) * 100) / 100

    }

    console.log(tablaAmortizacion)

    return tablaAmortizacion;

}

const monthlyPayment = (plazo, tasaMensual, valorInicial) => {

    return Math.round(((valorInicial * (tasaMensual/100))/(1 - Math.pow((1 + (tasaMensual/100)),(-plazo))))*100) / 100;

}

loanTable();

export default loanTable;