import React, { useState, useEffect } from 'react';

const SeguroDelBien = (valorDelBien, factorMillar, porcentaje, cobroMaximo, iva, aporteBomberos) => {

    const [seguroDelBien, setSeguroDelBien] = useState()

    const handlePrimaNeta = () => {
        return((valorDelBien*factorMillar)/1000)
    }
    const handleDerechoEmision = () => {
        let result
        (handlePrimaNeta()*(porcentaje/100)) > cobroMaximo
            ? result = 5
            : result = (handlePrimaNeta()*(porcentaje/100))
        return(result)
    }
    const handleIva = () => {
        return((handlePrimaNeta()+handleDerechoEmision())*(iva/100))
    }
    const handleAporteBomberos = () => {
        return(handlePrimaNeta()*(aporteBomberos/100))
    }
    const handleTotalPrima = () => {
        return(
            handlePrimaNeta()+handleDerechoEmision()+handleIva()+handleAporteBomberos()
        )
    }

    useEffect(() => {
        setSeguroDelBien(handleTotalPrima()/12)
    }, [valorDelBien])

    return(seguroDelBien)
}

export default SeguroDelBien;