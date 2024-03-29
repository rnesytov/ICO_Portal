import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';
import $ from 'jquery';
import _ from 'lodash';
import {media} from 'js/utils/media';

import VerificationStages from 'js/components/payment/stateless/VerificationStages';
import Button from 'js/components/common/Button';


class VerificationInfo extends React.Component {

    constructor() {
        super();
        this.addStageOffset = 250;
    }

    stageTracker = () => {
        let sectionName, $section, sectionHeight, sectionOffset;
        const addStageOffset = this.addStageOffset;

        $('[data-bind-to]').each(function(index, item) {
            sectionName = $(item).data('bind-to');
            $section = $(`.${sectionName}`);
            sectionHeight = $section.height();
            sectionOffset = $section.offset();
            if ($('.VerificationInfo').offset().top >= (sectionOffset.top - addStageOffset) &&
                $('.VerificationInfo').offset().top <= (sectionOffset.top + sectionHeight)) {
                    $('[data-bind-to]').removeClass('active');
                    $(`[data-bind-to="${sectionName}"]`).addClass('active');
            }
        });
    }

    stageClickHandler = event => {
        const addStageOffset = this.addStageOffset;
        let $el = $(event.currentTarget);
        let valToScroll = $(`.${$el.data('bind-to')}`).offset().top - addStageOffset;
        $('body,html').animate({
            'scrollTop': `${valToScroll}px`
        })
    }

    componentDidMount() {
        $(window).on('scroll', _.throttle(this.stageTracker,30));
    }

    render() {
        const {status, verificationStages, stages, isSubmiting, kycStatus, kycTicketId, clickHandler} = this.props;
        let btnText = !isSubmiting ? status === 'WAITING' ? 'Proceed' : 'Send and proceed' : 'Submitting...';

        return (
            <Wrapper className="VerificationInfo">
                <VerificationStages stageClickHandler={this.stageClickHandler} boundSections={verificationStages} stages={stages}/>
                <ButtonWrapper>
                    <Button type="submit" text={btnText} isSubmiting={isSubmiting} clickHandler={clickHandler}/>
                </ButtonWrapper>
            </Wrapper>
        )
    }
};


const mapStateToProps = ({KYC, tickets}) => ({
    status: KYC.get('state'),
    isSubmiting: KYC.get('isSubmiting'),
    tickets: tickets.get('results'),
    type: KYC.get('type'),
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(VerificationInfo)

const Wrapper = styled.div`
    margin: 0 38px;
    max-width: 315px;
    position: sticky;
    top: 20px;
    ${media.xs} {
        margin-left: 0;
        max-width: unset;
        width: 100%;
        margin: 0 auto 45px;
    }
    ${media.sm} {
        max-width: unset;
        width: 100%;
        margin: 0 auto 97px;
    }
    ${media.smMinus} {
        flex-basis: 100%;
    }
`;

const ButtonWrapper = styled.div`
    width: 190px;
    height: 45px;
    margin-bottom: 60px;
    ${media.xs} {
        width: 100%;
        margin-bottom: 0;
    }
    ${media.sm} {
        width: 100%;
    }
    ${media.smMinus} {
        margin-bottom: 0;
    }
`;
