import React from 'react'
import styled from 'styled-components';

class CurrencyCard extends React.Component {
    render() {

        let {rate, investCurrency, clickHandler, restCurrencies} = this.props;
        let selectedRestCode;

        restCurrencies.forEach(item => {
            if (investCurrency === item.code) selectedRestCode = item.code;
        })

        return (
            <Card onClick={clickHandler} className={selectedRestCode ? 'active' : ''}>
                <span className={selectedRestCode ? `icon-${selectedRestCode}-alt` : 'icon-other'}></span>
                <span className="currency-name">{selectedRestCode ? investCurrency : 'Other Crypto'}</span>
                <span className="currency-rate">{selectedRestCode ? `${rate} $` : ''}&nbsp;</span>
                {selectedRestCode && 
                    <React.Fragment>                       
                        <span className="CurrencyCard_head">Other crypto</span>
                        <span className="CurrencyCard_desc">Click to select another<br/>crypto as a payment method</span>
                    </React.Fragment>
                }
            </Card>
        )
    }
}

export default CurrencyCard;

const Card = styled.div`
    min-height: 157px;
    width: 170px;
    padding: 14px 16px;
    margin-bottom: 18px;
    display: inline-flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-between;
    border: solid 1px rgba(228, 232, 234, 0.25);
    box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.05);
    transition: all .25s ease;
    cursor: pointer;
    will-change: transform;
    position: relative;
    &:not(:last-of-type) {
        margin-right: 3%;
    }
    &:hover {
        [class^="icon-"] {
            color: rgba(80,154,245,1) !important;
            transform: scale(1.05);
        }
    }
    
    &.active {
        box-shadow: 0 2px 25px 0 rgba(63, 123, 244, 0.33);
        transform: scale(1.05);
        [class^="icon-"] {
            color: rgba(80,154,245,1) !important;
            transform: scale(1.05);
        }
        .currency-name {
            opacity: 1;
        }
    }
    .currency-name {
        font-size: 18px;
        color: rgb(42,44,47);
        opacity: .5;
        text-align: center;
    }
    [class^="icon-"] {
        font-size: 50px;
        margin: 20px 0 5px;
        color: rgba(80,154,245,.5);
        transition: all .25s ease;
    }
    .currency-rate {
        font-size: 13px;
        color: rgba(50,60,71,.6);
        transition: color .25s ease;
        white-space: nowrap;
    }
    .CurrencyCard_head, .CurrencyCard_desc {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    .CurrencyCard_head {
        font-size: 16px;
        color: rgb(42,44,47);
        text-align: center;
        top: -35px;
    }
    .CurrencyCard_desc {
        font-size: 14px;
        color: rgba(42,44,47,.6);
        text-align: center;
        bottom: -50px;
    }
`;