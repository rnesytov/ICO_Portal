import React from 'react';

import styled from 'styled-components';

import logo from './../../img/logo.svg';


class Nav extends React.Component {


    render() {
        return (

            <Wrapper>
                <IconLink bordered logo marginBottom="76px">
                    <img src={logo} alt="Logo"/>
                </IconLink>
                <span></span>
                <IconLink active>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24">
                      <g fill="#FFF">
                        <path fill="#FFF" d="M27.3341 5.5254L14.4334.0875a1.117 1.117 0 0 0-.8668 0L.666 5.5254c-.4046.1703-.6663.5614-.6659.9939.0007.4325.2639.8229.6685.9925l12.9007 5.4018a1.1174 1.1174 0 0 0 .8616 0l12.9007-5.4019c.405-.1692.6682-.56.6685-.9925.0004-.432-.2613-.8236-.6659-.9938zm-13.334 5.2203L3.8963 6.5149l10.104-4.2591 10.104 4.2591-10.104 4.2308zm13.9106 6.8577c-.2393-.5052-.8869-.7391-1.4436-.5222l-12.467 4.8409-12.467-4.8409c-.559-.2176-1.2043.0173-1.4436.5222-.2397.5049.0187 1.09.5768 1.3066l12.9002 5.0094c.1386.0538.2863.0806.4336.0806s.295-.0269.4336-.0806L27.3339 18.91c.5578-.2166.8161-.8018.5768-1.3066z"/>
                        <path fill="#FFF" d="M27.9118 11.608c-.2386-.5076-.8843-.744-1.4425-.5276l-12.4694 4.833-12.469-4.833c-.5589-.2167-1.2046.02-1.4425.5276-.2382.5084.0216 1.0957.5801 1.312l12.9004 5c.1378.0533.2844.08.431.08a1.194 1.194 0 0 0 .431-.08l12.9004-5c.5585-.2163.8184-.8037.5805-1.312z"/>
                      </g>
                    </svg>
                </IconLink>
                <IconLink>
                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="30" viewBox="0 0 35 35">
                      <g fill="#FFF">
                        <path fill="#FFF" d="M24 0c-5.8167 0-12 1.8738-12 5.3476v4.278c0 .5904.4887 1.0696 1.091 1.0696.602 0 1.0908-.4792 1.0908-1.0695V8.5112c2.315 1.431 6.1375 2.184 9.8182 2.184 3.6807 0 7.5033-.753 9.8182-2.184v1.1145c0 1.046-2.6837 2.7144-7.728 3.1272-.5978.0471-1.0451.5669-.995 1.1551.0459.5583.5237.9797 1.0844.9797.0328 0 .0611-.0021.0939-.0043 2.8407-.2331 5.6705-.954 7.5447-2.124v1.1443c0 .9134-1.9767 2.2268-5.6444 2.862-.5913.1027-.9883.6589-.8836 1.2386.0938.5176.5542.8834 1.0713.8834a.9712.9712 0 0 0 .192-.0171c2.2189-.3829 3.9949-1.0096 5.2647-1.8054v1.1166c0 .9134-1.9767 2.2268-5.6444 2.862-.5913.1027-.9883.6589-.8836 1.2386.0938.5176.5542.8834 1.0713.8834a.9712.9712 0 0 0 .192-.0171c2.2189-.383 3.9949-1.0118 5.2647-1.8054V22.46c0 .9134-1.9767 2.2267-5.6444 2.862-.5913.1027-.9883.6588-.8836 1.2385.0938.5177.5542.8835 1.0713.8835a.9712.9712 0 0 0 .192-.0172c2.2189-.3828 3.9949-1.0117 5.2647-1.8053v1.1166c0 1.046-2.6837 2.7144-7.728 3.1272-.5978.0471-1.0451.5669-.995 1.1551.0459.5583.5237.9797 1.0844.9797.0328 0 .0611-.0021.0939-.0043C31.1149 31.598 36 29.8203 36 26.738V5.3476C36 1.8738 29.8167 0 24 0zm0 8.5561c-5.9935 0-9.8182-1.9016-9.8182-3.2085 0-1.307 3.8247-3.2086 9.8182-3.2086 5.9935 0 9.8182 1.9016 9.8182 3.2086 0 1.307-3.8247 3.2085-9.8182 3.2085z"/>
                        <path fill="#FFF" d="M12 13c-5.8167 0-12 1.9467-12 5.5556v8.8888C0 31.0534 6.1833 33 12 33s12-1.9467 12-5.5556v-8.8888C24 14.9466 17.8167 13 12 13zm9.8182 14.4444c0 1.3578-3.8247 3.3334-9.8182 3.3334-5.9935 0-9.8182-1.9756-9.8182-3.3334v-1.1577c2.315 1.4866 6.1375 2.2689 9.8182 2.2689 3.6807 0 7.5033-.7823 9.8182-2.269v1.1578zm0-4.4444c0 1.3578-3.8247 3.3333-9.8182 3.3333-5.9935 0-9.8182-1.9755-9.8182-3.3333v-1.1578c2.315 1.4867 6.1375 2.269 9.8182 2.269 3.6807 0 7.5033-.7823 9.8182-2.269V23zM12 21.8889c-5.9935 0-9.8182-1.9756-9.8182-3.3333 0-1.3578 3.8247-3.3334 9.8182-3.3334 5.9935 0 9.8182 1.9756 9.8182 3.3334 0 1.3577-3.8247 3.3333-9.8182 3.3333z"/>
                      </g>
                    </svg>
                </IconLink>
                <IconLink>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="24">
                      <path fill="#FFF" d="M14.125 0C9.75 0 5.875 2.4 3.875 6.0632 2.6037 2.9354 1.6454 1.967 1 3.1579c-.968 1.7863-.678 7.2843 0 8.2105.678.9263 6.3788.2828 7.2725-.4006.5958-.4557-.2867-1.501-2.6475-3.1362 1.625-3.158 4.75-5.3053 8.5-5.3053C19.25 2.5263 23.5 6.8211 23.5 12c0 5.179-4.25 9.4737-9.375 9.4737-4.125 0-7.5-2.6526-8.875-6.3158H2.625C4 20.2105 8.625 24 14.125 24 20.75 24 26 18.5684 26 12S20.625 0 14.125 0zM12.25 12.7579c3.0807 1.8596 5.039 3.0385 5.875 3.5368 1.254.7475 2.2402-.7945 1-1.642-.8268-.5651-2.4935-1.5757-5-3.0316V6.3158c0-1.2904-1.875-1.5192-1.875.2765v6.1656z" opacity=".9"/>
                    </svg>
                </IconLink>
                <IconLink>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25">
                      <g fill="#EAF1FE">
                        <path d="M24.9961 22.9222L23.7354 2.0778C23.6662.9344 22.6744 0 21.5205 0H3.4915c-1.1632 0-2.146.9303-2.216 2.0778L.004 22.9222C-.066 24.0656.8117 25 1.9645 25h21.07c1.1589 0 2.031-.9303 1.9616-2.0778zm-22.1678-.7L4.0146 2.7779h16.9815l1.176 19.4445H2.8283z"/>
                        <path d="M15.341 6.6818v3.3327c0 .1951-.0856.5928-.3305.9724-.407.6306-1.141 1.0099-2.5104 1.0099-1.3695 0-2.1035-.3792-2.5105-1.01-.245-.3795-.3305-.7772-.3305-.9723V6.6818h-2.841v3.3327c0 .6305.1809 1.471.7349 2.3297.9247 1.4331 2.5877 2.2922 4.947 2.2922s4.0223-.859 4.947-2.2922c.554-.8586.7348-1.6992.7348-2.3297V6.6818H15.341z"/>
                      </g>
                    </svg>
                </IconLink>
            </Wrapper>            
        );
    }
}


export default Nav;


const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
`;

const IconLink = styled.a`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom: ${props => props.bordered ? '1px solid rgba(250,251,252,.2)' : 'unset'};

    background: ${props => props.active ? 'rgba(255,255,255,.2)' : 'unset'};
    height: ${props => props.logo ? '100px' : '76px'};

    margin-bottom: ${props => props.marginBottom || '0'}
`;