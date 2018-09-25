import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Link, Redirect} from 'react-router-dom'

import Button from './../common/Button';

import * as UIActions from "./../../actions/UIActions";


class PaymentStepThree extends React.Component {

    componentDidMount() {
        const {setStep} = this.props;
        setStep(3);
    }

    getTokenData = (token) => {
        const tokens_info = [
            {
                token: "ETH",
                explorerUrl: "https://etherscan.io/address/",
                explorerName: "Etherscan",
                perBlock: "15 seconds"
            }, {
                token: "BTC",
                explorerUrl: "https://blockexplorer.com/address/",
                explorerName: "Block Explorer",
                perBlock: "10 minutes",
            }
        ];
        return tokens_info.filter(item => item.token === token)[0]
    };

    getInfo = () => {
        const {investCurrency} = this.props;
        return this.getTokenData(investCurrency)
    };

    render() {
        const {investCurrency, crowdsaleAddress, altCrowdsaleaddress, step} = this.props;
        if (step === 1) {
            return <Redirect to='/user_office/payment'/>
        }
        const data = this.getInfo();
        let url = data.explorerUrl;
        url += investCurrency === 'ETH' ? crowdsaleAddress : altCrowdsaleaddress;
        return (
            <Wrapper>
                <Head>Your transaction is already on its way to your wallet!</Head>
                <Row className="PaymentRow PaymentRow-1">
                    <RowPart className="part">
                        <div className="text">We are waiting your transaction to be mined, you don't need to take any
                            actions. Usually mining transaction takes about {data.perBlock}, but depending on network
                            load
                            time may be longer. You can track your payment on <a target='_blank'
                                                                                 href={url}>{data.explorerName}</a>.
                        </div>
                    </RowPart>
                    <RowPart className="part">
                        <BtnWrapper to="/user_office/transactions">
                            <Button text="Go to transactions"/>
                        </BtnWrapper>
                    </RowPart>
                </Row>
            </Wrapper>
        )
    };
};


const mapStateToProps = ({Currencies, Invest, ICOInfo, UI}) => ({
    investCurrency: Currencies.get('investCurrency'),
    investAmount: Invest.get('investAmount'),
    tokensAmount: Invest.get('tokensAmount'),
    qrcode: Invest.get('qrcode'),
    crowdsaleAddress: ICOInfo.get('crowdsale_address'),
    altCrowdsaleaddress: ICOInfo.get('alt_crowdsale_address'),
    step: UI.get('step'),
});

const mapDispatchToProps = (dispatch) => ({
    setStep(step) {
        dispatch(UIActions.setStep(step));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentStepThree)

const Wrapper = styled.div`
    flex: 1;
    height: auto;
    margin-top: 42px;
    padding: 42px 105px 65px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
`;

const Head = styled.div`
    color: #323c47;
    font-size: 22px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 55px;
`;

const Row = styled.div`
    &.PaymentRow {
        &-1 {
            .text {
                font-size: 14px;
                color: #000000;
                letter-spacing: 0.4px;
                position: relative;
                line-height: 1.64;
                padding-left: 15px;
                padding-right: 150px;
                span {
                    color: #3476fd;
                    text-decoration: underline;
                }
                &:before {
                    content: '';
                    display: block;
                    width: 4px;
                    height: 110%;
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                    border-radius: 2px;
                    background: #4f99f6;
                }
            }
        }
    }
`;

const RowPart = styled.div`
    & .text {
        text-align: justify;
    }
    & a {
        text-decoration: underline;
    }
`;

const BtnWrapper = styled(Link)`
    width: 250px;
    height: 68px;
    display: block;
    margin: 0 auto;
    margin-top: 32px;
`;
