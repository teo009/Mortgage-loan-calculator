import React from "react";
import "../styles/Calculator.scss";

const TablaAmortizacion = ({valor, porcentajePrima, plazo, interes}) => {

  //VARIABLES QUE TIENEN QUE SER PARAMETRIZABLES POR EL BANCO
  let SVSD = 0.33;
  let BCA = 0.08;

  //VARIABLES PARA CALCULOS
  let seguro = SVSD + BCA;
  let monto = valor;
  let prima = porcentajePrima;
  let meses = plazo * 12;
  let interest = interes / 100;

  let Dias = 30; //Cambiar a dinamico
  let TotalFinanciar = 92250; //Cambiar a dinamico
  let CuotaSinSVSD = 868.13; //Cambiar a dinamico
  
  let saldoPrincipal = TotalFinanciar;
  
  let rows = [{cuota:0, principal: 0, intereses: 0,seguro: 0, cuotasvsd: 0, saldo: TotalFinanciar}];
  
  if(monto || prima || meses || interest != 0){
    for (let c = 1; c <= meses; c++) {
      let Intereses = parseFloat((saldoPrincipal * interest  * Dias / 360).toFixed(2)); 
      let Principal = parseFloat(CuotaSinSVSD - Intereses).toFixed(2);
      let svsd = ((saldoPrincipal * seguro) / 1000).toFixed(2); 
      saldoPrincipal = (saldoPrincipal - parseFloat(Principal));
  
      rows.push({
        cuota: c,
        principal: Principal,
        intereses: Intereses,
        seguro: svsd,
        cuotasvsd: CuotaSinSVSD,
        saldo: saldoPrincipal, 
      })
  
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
                      <td>$ {row.seguro}</td>
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
