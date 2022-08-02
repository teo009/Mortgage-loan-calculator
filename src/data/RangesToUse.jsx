import React from 'react';

const RangesToUse = () => {

    const ranges = [
        //newHousing = 
        {
            maxAmount: 350000, 
            annualInterestRate: {
                from: 8.50, 
                to: 10.00
            }, 
            maxYearsTerm: 30, 
            downPayment: {
                from: 10, 
                to: 90
            }
        },
        //socialInterestHousing = 
        {
            maxAmount: 50000, 
            annualInterestRate: {
                from: 5.50, 
                to: 9.00
            }, 
            maxYearsTerm: 25, 
            downPayment: {
                from: 5, 
                to: 90
            }
        },
        //noNewHousing = 
        {
            maxAmount: 350000, 
            annualInterestRate: {
                from: 9.00, 
                to: 10.25
            }, 
            maxYearsTerm: 20, 
            downPayment: {
                from: 10, 
                to: 90
            }
        },
        //constructionAndRemodeling = 
        {
            maxAmount: 350000, 
            annualInterestRate: {
                from: 10.00, 
                to: 10.50
            }, 
            maxYearsTerm: 10, 
            downPayment: {
                from: null, 
                to: null
            }
        },
    ]

    return(ranges);
}

export default RangesToUse;