import React, { useState, useEffect } from 'react';

const HelpTceaMortgage = (tirPercent) => {

    const [tceMortGage, setTceMortgage] = useState()

    const calculate = () => {
        return(
            (((1+(tirPercent/100))**12)-1)*100
        )
    }

    useEffect(() => {
        setTceMortgage(calculate())
    }, [tirPercent])

    return(tceMortGage)
}

export default HelpTceaMortgage;