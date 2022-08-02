import React from 'react';

const CostosAgilizacion = () => {

    const porcentajes = [
        {
            porcentaje: 50,
            inicio: 100, 
            fin: 1000
        },
        {
            porcentaje: 40, 
            inicio: 1001, 
            fin: 5000
        },
        {
            porcentaje: 30, 
            inicio: 5001, 
            fin: 10000
        },
        {
            porcentaje: 20, 
            inicio:10001, 
            fin:20000
        },
        {
            porcentaje: 10, 
            inicio: 20001, 
            fin: 30000
        },
    ]

    return(porcentajes);
}

export default CostosAgilizacion;