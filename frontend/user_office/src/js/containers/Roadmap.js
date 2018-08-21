import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import IconArrow from './../../img/arrow_roadmap.svg';



class Roadmap extends React.Component {

    render() {

        return (
            <Wrapper>
                <BarWrapper>
                    <Bar>
                        <InnerBar>
                            <Rate/>
                            <Point rate='1 OGD = 2 USD'/>
                        </InnerBar>
                        <Stage colored>
                            <div className="StageDesc">
                                <StageName blue>Pre ICO 2017</StageName>
                                <StageState>(Finished)</StageState>
                            </div>
                        </Stage>
                        <Stage colored>
                            <div className="StageDesc">
                                <StageName blue>Public sale 2018</StageName>
                                <StageState>(Now!)</StageState>
                            </div>
                        </Stage>
                    </Bar>
                </BarWrapper>
            </Wrapper>
        )
    }
};


const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Roadmap)


const Wrapper = styled.div`
    border: 1px solid rgba(151,151,151,.2);
    margin-bottom: 80px;
    height: 280px;
    position: relative;
`;

const BarWrapper = styled.div`
    position: absolute;
    left: 50%;
    bottom: 120px;
    width: 92%;
    transform: translateX(-50%);
`;

const Bar = styled.div`
    width: 100%;
    height: 5px;
    background: rgba(236,236,236,.5);
    position: relative;
`;

const InnerBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 48%;
    background: #397dff;
`;

const Point = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    width: 13px;
    height: 13px;
    border-radius: 100%;
    background: #397dff;
    box-shadow: 0 0 0 6px rgba(57, 125, 255, 0.16);
    &:before {
        content: 'You are here';
        font-size: 18px;
        color: #bfbfbf;
        white-space: nowrap;
        transform: translateX(-50%);
        top: -60px;
        left: 50%;
    }
    &:after {
        content: url(${IconArrow});
        transform: translateX(-50%) rotate(90deg);
        top: -42px;
        left: calc(50% - 2px);
    }
    &:after, &:before {
        position: absolute;
    }
`;
const Rate = styled.div`
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    right: 0;
    width: 13px;
    height: 13px;
    border-radius: 100%;
    background: #397dff;
    box-shadow: 0 0 0 6px rgba(57, 125, 255, 0.16);
    &:before {
        content: '1 OGD = 2 USD';
        font-size: 18px;
        color: #397dff;
        white-space: nowrap;
        transform: translateX(-50%);
        top: -90px;
        left: 50%;
    }
    &:after {
        content: url(${IconArrow});
        transform: translateX(-50%) rotate(90deg);
        top: -42px;
        left: calc(50% - 2px);
    }
    &:after, &:before {
        position: absolute;
    }
`;

const Stage = styled.div`
    width: 2px;
    height: 30px;
    background: ${props => props.colored ? '#397dff' : 'rgba(236,236,236,.5)'};
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    &:nth-child(1) {
        left: 0;
    }
    &:nth-child(2) {
        left: 33%;
    }
    &:nth-child(3) {
        left: 66%;
    }
    .StageDesc {
        position: absolute;
        bottom: -55px;
        left: -50%;
        transform: translateX(-50%);
        text-align: center;
        div {
            white-space: nowrap;
        }
    }
    &:nth-of-type(3) .StageDesc {
        // right: 0 !important;
        // left: unset !important;
    }
    &:before {
        content: attr(data-rate);
        font-size: 18px;
        color: ${props => props.colored ? '#397dff' : '#505050'};
        position: absolute;
        left: 0;
        top: -85px;
        white-space: nowrap;
    }
`;

const StageName = styled.div`
    color: ${props => props.blue ? "#397dff" : "#050505"};
    font-size: 18px;
    margin-bottom: 3px;
`;

const StageState = styled.div`
    color: #000000;
    opacity: .7;
`;
