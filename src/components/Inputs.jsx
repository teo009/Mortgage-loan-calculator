import React, { useState, useEffect } from "react";
import RangesToUse from "../data/RangesToUse";

function Inputs({ onChange }) {

    const [valor, setValor] = useState(100000);
    const [porcentajePrima, setPorcentajePrima] = useState(10);
    const [plazo, setPlazo] = useState(20);
    const [interes, setInteres] = useState(9.50);

    const validationRanges = RangesToUse()

    useEffect(() => {
        onChange(valor, porcentajePrima, plazo, interes);
      }, [onChange, valor, porcentajePrima, plazo, interes]);
    
  return (
    <div className="col-6 inputs">
      <label>Tipo de Crédito: <b>Vivienda nueva</b></label>
      <div className="valor">
        <label>Valor de la vivienda</label>
        <div>
            <label>{valor}</label>
          <input 
            type="range" 
            value={valor}
            step={5000}
            min={20000}
            max={validationRanges[0].maxAmount}
            onChange={(e) => setValor(e.target.value)}
          />
        </div>
      </div>
      <div className="prima">
        <label>Prima (%)</label>
        <div>
          <label>{porcentajePrima}</label>
          <input 
            type="range" 
            value={porcentajePrima}
            min={validationRanges[0].downPayment.from}
            max={validationRanges[0].downPayment.to}
            onChange={(e) => setPorcentajePrima(e.target.value)}
          />
        </div>
      </div>
      <div className="interes">
        <label>Tasa Interés Anual (%)</label>
        <div>
          <label>{interes}</label>
          <input 
            type="range" 
            value={interes}
            step={0.1}
            min={validationRanges[0].annualInterestRate.from}
            max={validationRanges[0].annualInterestRate.to}
            onChange={(e) => setInteres(e.target.value)}
          />
        </div>
      </div>
      <div className="plazo">
        <label>Plazo (Años)</label>
        <div>
          <label>{plazo}</label>
          <input 
            type="range" 
            value={plazo}
            min={1}
            max={validationRanges[0].maxYearsTerm}
            onChange={(e) => setPlazo(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Inputs;
