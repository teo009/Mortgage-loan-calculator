import React, { useState, useEffect } from 'react';

const SVSD = (factor, biac) => {

    const [totalSvsd, setTotalSvsd] = useState()

    useEffect(() => {
        setTotalSvsd(factor+biac)
    }, [])

    return(totalSvsd)
}

export default SVSD;