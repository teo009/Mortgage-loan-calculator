import React from 'react';

const HelpRounding = (number, decimal) => {

    const handleRound = (num, dec) => {
        let result = Math.pow(10, dec || 2)
        return (parseInt(num * result, 10) / result)
    }

    return(handleRound(number, decimal))
}

export default HelpRounding