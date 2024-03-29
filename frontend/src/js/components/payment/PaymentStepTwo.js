import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {media} from 'js/utils/media';

import CurrencyCalculator from 'js/components/payment/CurrencyCalculator';
import Currency from 'js/components/payment/Currency';

import * as UIActions from 'js/actions/UIActions';


class PaymentStepTwo extends React.Component {

    componentDidMount() {
        const { setStep } = this.props;
        setStep(2);
    }

    render() {

        return (
            <Wrapper>
                <Head>Select payment method</Head>
                <Currency/>
                <CurrencyCalculator/>
            </Wrapper>
        )
    }
};


const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    setStep(step) {
        dispatch(UIActions.setStep(step));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentStepTwo)

const Wrapper = styled.div`
    flex: 1;
    height: auto;
    margin-top: 42px;
    padding: 42px 50px 65px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    ${media.sm} {
        width: calc(100vw - 192px);
    }
    ${media.xs} {
        width: calc(100vw - 32px);
        margin-top: 30px;
        padding: 20px 15px 38px;
    }
`;

const Head = styled.div`
    color: #323c47;
    font-size: 22px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 55px;
    ${media.xs} {
        font-size: 16px;
        margin-bottom: 35px;
    }
`;
