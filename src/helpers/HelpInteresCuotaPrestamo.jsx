import React, { useState, useEffect } from 'react';

const HelpInteresCuotaPrestamo = (interesCorriente) => {

    const [interesCuotaPrestamo, setInteresCuotaPrestamo] = useState()

    const handleCalculate = () => {
        let firstResult = (interesCorriente/100)
        let secondResult = ((360*12)/365)
        return((firstResult/secondResult).toFixed(5))
    }

    useEffect(() => {
        setInteresCuotaPrestamo(handleCalculate())
    }, [interesCorriente])

    return(interesCuotaPrestamo)
}

export default HelpInteresCuotaPrestamo;