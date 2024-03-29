import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {media} from 'js/utils/media';

import getValidationSchema from 'js/utils/getValidationSchema';
import formatInvestedValue from 'js/components/payment/utils/formatInvestedValue';

import ErrorMessage from 'js/components/common/ErrorMessage';
import Button from 'js/components/common/Button';
import InvestInput from 'js/components/payment/stateless/InvestInput';

import * as UIActions from 'js/actions/UIActions';
import * as InvestActions from 'js/actions/InvestActions';
import * as ICOInfoActions from 'js/actions/ICOInfoActions';


class CurrencyCalculator extends React.Component {

    constructor() {
        super();
        this.bonus = 0;
    }

    openKYCTip = (e) => {
        e.preventDefault();
        this.props.showModal({id: 2});
    };

    openEthSetTip = e => {
        e.preventDefault();
        this.props.showModal({id: 3});
    };

    updateTotalTokens = () => {
        const {investAmount, investCurrencyRate, setUSDAmount, setTokensAmount, tokenPrice} = this.props;
        let bonus = this.bonus;
        let totalUSD = investAmount * investCurrencyRate;
        let totalTokens = totalUSD / tokenPrice;

        if (totalUSD < 8000) bonus = 0;
        else if (totalUSD >= 150 && totalUSD < 1000) bonus = 20;
        else if (totalUSD >= 1000) bonus = 40;
        totalTokens += totalTokens / 100 * bonus;
        this.bonus = bonus;
        setTokensAmount(totalTokens);
        setUSDAmount(totalUSD);
    };

    onChangeHandler = event => {
        event.preventDefault();
        let value = event.target.value;
        let formatedValue = formatInvestedValue(value);
        
        if (formatedValue !== false) {
            this.props.setInvestAmount(formatedValue)
            this.updateTotalTokens();
            this.validateData({
                name: 'investInput',
                value: formatedValue
            });
        }
    };

    investOnPasteHandler = event => {
        event.preventDefault();
    }

    investClickHandler = () => {
        const {investCurrency, showInvestOptions, getAltCryptoAccount} = this.props;
        showInvestOptions();
        if (investCurrency !== 'ETH') getAltCryptoAccount(investCurrency);
    };

    initialUpdate = () => {
        this.updateTotalTokens();
    };

    validateData = ({name, value}) => {
        const {setInvestErrorText} = this.props;
        const schema = getValidationSchema(name);

        schema.validate({
            [name]: value 
        }).then(() => {
            setInvestErrorText(null);
        }).catch(err => {
            setInvestErrorText(err.errors[0]);
        })
        
    }

    render() {
        const {
            tokenPrice,
            investCurrency,
            investCurrencyRate,
            investAmount,
            USDAmount,
            tokensAmount,
            kycState,
            ethAccount,
            investErrorText
        } = this.props;


        let ethSet = !!ethAccount;
        let kycApproved = kycState === 'APPROVED';
        let bonus = this.bonus;
        let investLabelText = investCurrency ? "Amount, min " + (10 / investCurrencyRate).toFixed(3) + " " + investCurrency : 'Amount';
        this.initialUpdate();
        return (
            <Wrapper>
                <WrapperInner>
                    <InvestInput value={investAmount} type="text"
                        onChangeHandler={this.onChangeHandler}
                        onPasteHandler={this.investOnPasteHandler}
                        investLabelText={investLabelText}
                        currency={investCurrency}>
                            <ErrorMessage text={investErrorText}/>
                        </InvestInput>
                    <TokensInputWrapper data-currency="OGD">
                        <TokensInput>
                            {tokensAmount && tokensAmount.toFixed(2) || 0}
                        </TokensInput>
                    </TokensInputWrapper>

                    <ButtonWrapper to="/user_office/payment/buy">
                        <Button disabled={USDAmount < 5}
                                clickHandler={ethSet ? kycApproved ? this.investClickHandler : this.openKYCTip : this.openEthSetTip}
                                text="Buy"/>
                    </ButtonWrapper>
                </WrapperInner>

                <CalculatedWrapper>
                    {!investCurrency && 'Please select currency you d\'like to spend.'}
                    {investCurrency &&
                    <div>
                        <ul>
                            <li>You pay {investAmount} {investCurrency} </li>
                            <li>Which is equal to {investAmount} * {investCurrencyRate} USD
                                = {USDAmount.toFixed(2)} USD
                            </li>
                            <li>Token base price = {tokenPrice} USD</li>
                            {USDAmount >= 10 &&
                            <div>
                                <li>Pre-Sale phase {bonus}% bonus applied so you get</li>
                                <li>{USDAmount.toFixed(2)} / {tokenPrice} * {bonus}% = {tokensAmount.toFixed(2)} OGD</li>
                            </div>
                            }
                            {USDAmount < 10 &&
                            <div>
                                <li>It's less than minimum purchase of $ 10</li>
                                <li>Please enter amount {(10 / investCurrencyRate).toFixed(3)} {investCurrency} or
                                    more
                                </li>
                            </div>
                            }


                        </ul>
                    </div>
                    }
                </CalculatedWrapper>

                <BonusDesc>
                    Progressive bonus for public sale phase is
                    currently available! Investing more than 150 USD will grant you 20% bonus!
                    Invest more than 1&nbsp;000 USD and get <span>40% bonus tokens!</span>
                </BonusDesc>
            </Wrapper>
        )
    }
};


const mapStateToProps = ({Currencies, Invest, UI, KYC, user}) => ({
    investCurrency: Currencies.get('investCurrency'),
    investCurrencyRate: Currencies.get('investCurrencyRate'),
    investAmount: Invest.get('investAmount'),
    tokensAmount: Invest.get('tokensAmount'),
    USDAmount: Invest.get('USDAmount'),
    bonusPercent: 0,
    kycState: 'APPROVED',
    openedTip: UI.get('openedTip'),
    ethAccount: user.get('eth_account'),
    tokenPrice: Invest.get('tokenPrice'),
    investErrorText: Invest.get('investErrorText')
})

const mapDispatchToProps = (dispatch) => ({
    setInvestAmount(payload) {
        dispatch(InvestActions.setInvestAmount(payload))
    },
    setUSDAmount(payload) {
        dispatch(InvestActions.setUSDAmount(payload))
    },
    setTokensAmount(payload) {
        dispatch(InvestActions.setTokensAmount(payload))
    },
    showInvestOptions() {
        dispatch(UIActions.showInvestOptions());
    },
    getAltCryptoAccount(payload) {
        dispatch(ICOInfoActions.getCryptoAccountRequest(payload))
    },
    showModal(payload) {
        dispatch(UIActions.showModal(payload))
    },
    setInvestErrorText(payload) {
        dispatch(InvestActions.setInvestErrorText(payload))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyCalculator);

const Wrapper = styled.div`

`;

const WrapperInner = styled.div`
    display: flex;
    justify-content: start;
    border-top: 1px solid rgba(151,151,151,.2);
    border-bottom: 1px solid rgba(151,151,151,.2);
    padding: 90px 0 50px;
    margin-bottom: 40px;
    ${media.sm} {
        margin-bottom: 40px;
    }
    ${media.smMinus} {
        flex-wrap: wrap;
    }
    ${media.xs} {
        padding: 63px 0 32px;
        margin-bottom: 32px;
    }
`;

const ButtonWrapper = styled(Link)`
    display: inline-block;
    width: 100%;
    max-width: 34.4%;
    height: 70px;
    border-radius: 2px;
    border: 1px solid #d6dfe6;
    position: relative;
    ${media.sm} {
        width: 240px;
    }
    ${media.smMinus} {
        max-width: unset;
    }
    ${media.xs} {
        height: 49px;
    }
`;

const CalculatedWrapper = styled.div`
    font-size: 16px;
    color: #000000;
    letter-spacing: 0.5px;
    position: relative;
    padding-left: 15px;
    ${media.xs} {
        font-size: 14px;
        line-height: 20px;
    }
    & ul {
        font-weight: normal;
    }
    &:before {
        content: '';
        display: block;
        width: 4px;
        height: 110%;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background: #4f99f6;
    }
`;

const BonusDesc = styled.p`
    font-size: 16px;
    color: #000000;
    letter-spacing: 0.5px;
    position: relative;
    padding-left: 15px;
    margin-top: 45px;
    ${media.xs} {
        font-size: 14px;
        line-height: 20px;
        margin-top: 35px;
    }
    span {
        color: #3679fc;
    }
    &:before {
        content: '';
        display: block;
        width: 4px;
        height: 110%;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background: #4f99f6;
    }
`;

const TokensInputWrapper = styled.div`
    display: inline-block;
    width: 345px;
    height: 70px;
    border-radius: 2px;
    border: 1px solid #d6dfe6;
    position: relative;
    margin-right: 32px;
    ${media.smMinus} {
        width: 100%;
        margin: 0 0 15px;
    }
    ${media.xs} {
        height: 49px;
    }
    .head {
        color: #0a0a0a;
        position: absolute;
        left: 0;
        top: -35px;
        font-size: 16px;
        span {
            color: #3476fd;
        }
    }
    &:after {
        content: attr(data-currency);
        color: rgba(10,10,10, 0.4);
        position: absolute;
        font-size: 18px;
        right: 27px;
        top: 50%;
        transform: translateY(-50%);
        ${media.xs} {
            font-size: 14px;
        }
    }
`;

const TokensInput = styled.div`
    width: 345px;
    height: 70px;
    margin-right: 32px;
    padding-right: 67px;
    padding-left: 18px;
    line-height: 70px;
    font-weight: 600;
    color: #b6b6b6;
    ${media.xs} {
        height: 49px;
        font-size: 14px;
        line-height: 49px;
    }
    .bonus {
        color: #3476fd;
    }
`;
