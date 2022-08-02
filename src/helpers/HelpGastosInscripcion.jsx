import React, { useState, useEffect } from 'react';
import CostosAgilizacion from '../data/CostosAgilizacion';

const HelpGastosInscripcion = (valor, TCoficial, montoMaximo) => {

    const costosAgilizacion = CostosAgilizacion()
    const [gastosInscripcion, setGastosInscripcion] = useState()

    const handleInscripcionCompraVenta = () => {
        let result
        ((valor*TCoficial)*(1/100)) <= montoMaximo 
            ? result = ((valor)*(1/100)) 
            : result = (montoMaximo/TCoficial)
        return(result)
    }
    
    const handleAgilizacionInscripcion = () => {
        let result
        if((handleInscripcionCompraVenta()*TCoficial) >= costosAgilizacion[4].inicio){
            result = (handleInscripcionCompraVenta())*(costosAgilizacion[4].porcentaje/100) 
        } else if((handleInscripcionCompraVenta()*TCoficial) >= costosAgilizacion[3].inicio) {
            result = (handleInscripcionCompraVenta())*(costosAgilizacion[3].porcentaje/100)
        } else if((handleInscripcionCompraVenta()*TCoficial) >= costosAgilizacion[2].inicio) {
            result = (handleInscripcionCompraVenta())*(costosAgilizacion[2].porcentaje/100)
        } else if((handleInscripcionCompraVenta()*TCoficial) >= costosAgilizacion[1].inicio) {
            result = (handleInscripcionCompraVenta())*(costosAgilizacion[1].porcentaje/100)
        } else if((handleInscripcionCompraVenta()*TCoficial) >= costosAgilizacion[0].inicio) {
            result = (handleInscripcionCompraVenta())*(costosAgilizacion[0].porcentaje/100)
        }
        return(result)
    }

    useEffect(() => {
        setGastosInscripcion(
            (handleInscripcionCompraVenta())+(handleAgilizacionInscripcion())
        )
    }, [valor, TCoficial, montoMaximo])

    return(gastosInscripcion);
}

export default HelpGastosInscripcion;