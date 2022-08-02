import React, { useState, useEffect } from "react";
import HelpInteresCuotaPrestamo from "../helpers/HelpInteresCuotaPrestamo";
import HelpGastosInscripcion from "../helpers/HelpGastosInscripcion";
import HelpCuotaPrestamo from "../helpers/HelpCuotaPrestamo";
import HelpTceaMortgage from "../helpers/HelpTceaMortgage";
import SeguroDelBien from "../helpers/SeguroDelBien";
import SVSD from "../helpers/SVSD";
import "../styles/Calculator.scss";

const Calculator = ({valor, porcentajePrima, plazo, interes}) => {

    //Importar datos de un componente DATAhelper
    const PORCENTAJECOMISION = 0.50
    const PORCENTAJEGASTOSLEGALES = 2
    const TCOFICIAL = 35.8579
    const MONTOMAXIMO = 30000 //Monto máximo gastos de inscripción
    const FACTORSVSD = 0.33
    const BIAC = 0.08
    const FACTORMILLAR = 3
    const PORCENTAJEDERECHOEMISION = 2
    const COBROMAXIMODERECHOEMISION = 5
    const IVA = 15
    const PORCENTAJEAPORTEBOMBEROS = 1
    const TIRPERCENT = 1

    const [primaResult, setPrimaResult] = useState(0)
    const [subTotal, setSubTotal] = useState()
    const [comision, setComision] = useState()
    const [gastosLegales, setGastosLegales] = useState()
    const [financiar, setFinanciar] = useState()
    const [cuotaConSeguros, setCuotaConSeguros] = useState()

    const gastosInscripcion = HelpGastosInscripcion(valor, TCOFICIAL, MONTOMAXIMO)
    const tazaInteres = HelpInteresCuotaPrestamo(interes)
    const cuotaSinSeguros = HelpCuotaPrestamo(financiar, tazaInteres, (plazo*12))
    const seguroVida = (financiar*SVSD(FACTORSVSD, BIAC))/1000
    const seguroBien = SeguroDelBien(valor, FACTORMILLAR, PORCENTAJEDERECHOEMISION, COBROMAXIMODERECHOEMISION, IVA, PORCENTAJEAPORTEBOMBEROS)
    const tcea = HelpTceaMortgage(TIRPERCENT)

    useEffect(() => {
        setPrimaResult((valor)*(porcentajePrima*0.01))
        setSubTotal((valor)-(primaResult))
        setComision((subTotal*PORCENTAJECOMISION)/(100))
        setGastosLegales((subTotal*PORCENTAJEGASTOSLEGALES)/100)
        setFinanciar(subTotal+comision+gastosLegales)
        setCuotaConSeguros(cuotaSinSeguros+seguroVida+seguroBien)
    }, [valor, porcentajePrima, primaResult, subTotal, comision, cuotaSinSeguros])
    
    return(  

        <div className='col-6 outputs'>
            <label>Cotización</label>
            <div className='results'>
                <div>
                    <label>Valor de la Vivienda</label>
                    <label>
                        ${
                            typeof valor === 'number'
                                ? valor.toFixed(2) : valor
                        }
                    </label>
                </div>
                <div>
                    <label>Prima</label>
                    <label>
                        ${
                            typeof primaResult === 'number'
                                ? primaResult.toFixed(2) : primaResult
                        }
                    </label>
                </div>
                <div>
                    <label>Sub-Total</label>
                    <label>
                        ${
                            typeof subTotal === 'number'
                                ? subTotal.toFixed(2) : subTotal
                        }
                    </label>
                </div>
                <div>
                    <label>Comisión</label>
                    <label>
                        ${
                            typeof comision === 'number'
                                ? comision.toFixed(2) : comision
                        }
                    </label>
                </div>
                <div>
                    <label>Gastos Legales</label>
                    <label>
                        ${
                            typeof gastosLegales === 'number'
                                ? gastosLegales.toFixed(2) : gastosLegales
                        }
                    </label>
                </div>
                <div>
                    <label><b>Total a Financiar</b></label>
                    <label>
                        <b>
                            ${
                                typeof financiar === 'number'
                                    ? financiar.toFixed(2) :financiar
                            }
                        </b>
                    </label>
                </div>
                <div>
                    <label>Gastos de Inscripción</label>
                    <label>
                        ${ 
                            typeof gastosInscripcion === 'number' 
                                ? gastosInscripcion.toFixed(2) : gastosInscripcion 
                        }
                    </label>
                </div>
                <div>
                    <label>Cuota sin Seguros</label>
                    <label>
                        ${
                            typeof cuotaSinSeguros === 'number'
                                ? cuotaSinSeguros.toFixed(2) : cuotaSinSeguros
                        }
                    </label>
                </div>
                <div>
                    <label>Seguro de Vida</label>
                    <label>
                        ${
                            typeof seguroVida === 'number'
                                ? seguroVida.toFixed(2) : seguroVida
                        }
                    </label>
                </div>
                <div>
                    <label>Seguro del Bien</label>
                    <label>
                        ${
                            typeof seguroBien === 'number'
                                ? seguroBien.toFixed(2) : seguroBien
                        }
                    </label>
                </div>
                <div>
                    <label>Cuota con Seguros</label>
                    <label>
                        ${
                            typeof cuotaConSeguros === 'number'
                                ? cuotaConSeguros.toFixed(2) : cuotaConSeguros
                        }
                    </label>
                </div>
                <div>
                    <label>Tasa de Costo Efectivo Anual (TCEA)</label>
                    <label>
                        ${
                            typeof tcea === 'number'
                                ? tcea.toFixed(2) : tcea
                        }%
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Calculator;
