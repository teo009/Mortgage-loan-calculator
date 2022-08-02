import React, {useState} from "react";
import Calculator from "./Calculator";
import TablaAmortizacion from "./Tabla";
import Inputs from "./Inputs";
import "../styles/Calculator.scss";

const App = () => {
  const [valor, setValor] = useState(20000);
  const [porcentajePrima, setPorcentajePrima] = useState(10);
  const [plazo, setPlazo] = useState(0);
  const [interes, setInteres] = useState(0);

  return (
    <>
      <div className="container">
        <Inputs
          onChange={(valor, porcentajePrima, plazo, interes) => {
            setValor(valor);
            setPorcentajePrima(porcentajePrima);
            setPlazo(plazo);
            setInteres(interes);
          }}
        />
        <Calculator 
          valor={valor} 
          porcentajePrima={porcentajePrima} 
          plazo={plazo} interes={interes}
        />
      </div>
      <TablaAmortizacion 
        valor={valor} 
        porcentajePrima={porcentajePrima} 
        plazo={plazo} interes={interes}
      />
    </>
  );
};

export default App;
