import React, { useState, useEffect } from "react";
import moment from "moment";
import "../styles/Calculator.scss";

const TablaAmortizacion = ({ valor, porcentajePrima, plazo, interes }) => {
  //VARIABLES QUE TIENEN QUE SER PARAMETRIZABLES POR EL BANCO
  let SVSD = 0.33;
  let BCA = 0.08;
  const CommisionPercen = 0.5; // Porcentaje de comisión bancario
  const PercenLegalExpense = 2; //Porcentaje de Gastos Legales

  //VARIABLES PARA CALCULOS
  let insurance = SVSD + BCA;
  let amount = valor;
  let bonus = porcentajePrima;
  let months = plazo * 12;
  let interest = interes / 100; 

  //Para calculo de total a financiar
  const [primaResult, setPrimaResult] = useState(0);
  const [subTotal, setSubTotal] = useState();
  const [comision, setComision] = useState();
  const [gastosLegales, setGastosLegales] = useState();
  const [financiar, setFinanciar] = useState();

  useEffect(() => {
    setPrimaResult(valor * (porcentajePrima * 0.01));
    setSubTotal(valor - primaResult);
    setComision((subTotal * CommisionPercen) / 100);
    setGastosLegales((subTotal * PercenLegalExpense) / 100);
    setFinanciar(subTotal + comision + gastosLegales);
  }, [valor, porcentajePrima, primaResult, subTotal, comision]);

  //Función calcula el dividendo de la formula de la cuota nivelada
  const currentInterest = (interes) => {
    // let Factor = ((360 * 12) / 365).toPrecision(4); Retorna 11.84
    let Factor = 11.83;
    return interes / Factor;
  };
  
  /*Utilizo Number('Aqui los calculos flotantes').toString().match(/^\d+(?:\.\d{0,4})?/)
  Para lidiar con la precision de calculos con numeros flotantes. Con la función number recupero que sea de tipo
  numerico o flotante, el toString().match(/^\d+(?:\.\d{0,4})?/) para que me haga una reducción a 4 decimales.
  */

  // Guardo en una variable la función currentInterest
  let currentInter =  Number(currentInterest(interes).toString().match(/^\d+(?:\.\d{0,4})?/)); //Para convertir a 4 decimales
  //Función calcula la cuota sin SVSD
  const Cuota = (financiar) => {
    const Annuity =
      Number((1 - Number((Math.pow((1 + (currentInter/100)),(months * -1)).toFixed(4)))).toString().match(/^\d+(?:\.\d{0,8})?/)) / parseFloat((currentInter/100));
    return Number(parseFloat(financiar) / Number(Annuity).toString().match(/^\d+(?:\.\d{0,4})?/)).toString().match(/^\d+(?:\.\d{0,2})?/);
  };

  let totalFinance = financiar;
  let CuotaSinSVSD = Cuota(totalFinance); //Cuota nivelada constante para el metodo de cuota nivelada

  let mainBalance = totalFinance; //Saldo final restante

  //Array para guardar los calculos por fila o # Cuota
  let rows = [
    {
      cuota: 0,
      principal: 0,
      intereses: 0,
      insurance: 0,
      cuotasvsd: 0,
      saldo: totalFinance,
    },
  ];

  // //Calculo de dias
  // "2022-06-23T06:00:00Z" Fecha del excel
  let SDateToday = new Date().toISOString(); //Fecha actual
  let SDateCopy = SDateToday; //copia de la string que ira cambiando en el ciclo for
  let dateC = new Date(SDateCopy); 
  const DayConst = dateC.getDate(); //Dia de la fecha actual para que sea constante en el ciclo for

  if (amount || bonus || plazo || interest != 0) {
    for (let c = 1; c <= months; c++) {
      //Calculo de dias
      let MDateA = moment(SDateCopy); // Para mas información de esta libreria en https://momentjs.com/
      console.log(SDateCopy);

      dateC.setMonth(dateC.getMonth() + 1); //Sumamos un mes mas que sirve para obtener la fecha próxima de pago
      let cadena = ""+dateC.getFullYear()+"-"+(dateC.getMonth()+1)+"-"+DayConst.toString() + " 00:00:00"; //Creamos la cadena de la fecha próxima de pago
      console.log('cadena: ' + cadena);
      let dateProx = new Date(cadena); //Fecha próxima de pago(Date)
      console.log(dateProx + "Primera dateProx/.")
      dateProx.setHours(6,0,0);
      console.log('Fecha prox: ' + dateProx);
      
      let SDateProx = dateProx.toISOString(); //La Date la convertimos a cadenas para utilizarla con moment.js

      let MdateProx = moment(SDateProx);
      console.log(SDateProx);
      //obtenesmos los numero de dias
      let days = MdateProx.diff(MDateA, 'days');
      console.log(days);
      //Actualizamos a la nueva fecha actual
      dateC = dateProx;
      SDateCopy = SDateProx;

      //Calculamos los intereses de la cuota c
      let Intereses = parseFloat(
        ((mainBalance * interest * days) / 360).toFixed(2)
      );
      //Calculo del de la cuota 
      let Principal = parseFloat(CuotaSinSVSD - Intereses).toFixed(2);
      //Calculo del seguro
      let svsd = ((mainBalance * insurance) / 1000).toFixed(2);
      
      if(c == months){
        Principal = mainBalance;
        CuotaSinSVSD = Number((parseFloat(Principal) + Intereses).toString().match(/^\d+(?:\.\d{0,2})?/));
      }
      //Saldo final restante
      mainBalance = Number(mainBalance - parseFloat(Principal)).toString().match(/^\d+(?:\.\d{0,2})?/);

      rows.push({
        cuota: c,
        principal: Principal,
        intereses: Intereses,
        insurance: svsd,
        cuotasvsd: CuotaSinSVSD,
        saldo: mainBalance,
      });
    }
  }

  return (
    <div className="row">
      <div className="col-12">
        <div className="container-xl my-3 box">
          <div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Cuota</th>
                  <th scope="col">Interés</th>
                  <th scope="col">Principal</th>
                  <th scope="col">SVSD</th>
                  <th scope="col">Cuota sin SVSD</th>
                  <th scope="col">Saldo Principal</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.cuota}>
                    <th scope="row">{row.cuota}</th>
                    <td>$ {row.intereses}</td>
                    <td>$ {row.principal}</td>
                    <td>$ {row.insurance}</td>
                    <td>$ {row.cuotasvsd}</td>
                    <td>$ {row.saldo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaAmortizacion;
