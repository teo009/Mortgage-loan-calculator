import React, { useEffect, useState } from 'react';
import HelpRounding from './HelpRounding';

const HelpCuotaPrestamo = (financiamiento, intereses, meses) => {

    const [cuotaPrestamo, setCuotaPrestamo] = useState()

    const handleCuotaPrestamo = () => {
        let x = 1 - (1+parseFloat(intereses)) **(-meses)
        return(
            (financiamiento)/( HelpRounding(x, 4) / (intereses))
        );
    }

    useEffect(() => {
        setCuotaPrestamo(handleCuotaPrestamo()) 
    }, [financiamiento, meses, intereses])

    //console.log((1 - (1+parseFloat(intereses)) **(-meses) ))

    return(cuotaPrestamo)
}

export default HelpCuotaPrestamo;