import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import moment from "moment/moment";
import {media} from 'js/utils/media';

import iconUser from 'img/user.svg';
import iconResolved from 'img/check-green.svg';
import iconPending from 'img/icon_transit-amber.svg';


const Ticket = ({email, id, status, title, lastReplyBy, lastReplyAt, created, onClickHandler}) => {

    return (
        <StyledTicket>
            <td callspan="1">
                <TicketLink to={`/user_office/support/ticket/${id}`} onClick={onClickHandler.bind(this, id)}>
                    <div>
                        <img src={[3,4].includes(status) ? iconResolved : iconPending} alt="Ticket status"/>
                    </div>
                    <div>
                        <span>{title}</span>
                        <span>{[3,4].includes(status) ? 'Answer received' : 'Pending'}</span>
                    </div>
                </TicketLink>
            </td>
            <TicketInfo callspan="1">
                <div>
                    <img src={iconUser} alt="User thumbnail"/>
                </div>
                <div className="hidden-xs">
                    <span>{lastReplyBy === email && 'You' || lastReplyBy || 'Unknown'}</span>
                    <span>
                        {`${lastReplyBy !== email ? "Replied" : "Message sent"} ${moment(created).format('DD MMMM YYYY')}`}
                    </span>
                </div>
            </TicketInfo>
        </StyledTicket>
    )
}


export default Ticket;

const StyledTicket = styled.tr`
    display: flex;
    justify-content: space-between;
    border-top: 1px solid rgb(151,151,151,.2);
    &:last-of-type {
        border-bottom: 1px solid rgb(151,151,151,.2);
    }
    ${media.xs} {
        padding: 15px 0;
    }
`;

const TicketLink = styled(Link)`
    display: inline-flex;
    flex-flow: row nowrap;
    ${media.smPlus} {
        height: 85px;
        align-items: center;
    }
    img {
        width: 40px;
        height: auto;
        margin-right: 16px;
        ${media.xs} {
            margin-right: 10px;
            width: 32px;
        }
    }
    span:nth-of-type(1) {
        color: #000000;
        font-weight: 500;
        display: block;
        margin-bottom: 3px;
        ${media.xs} {
            font-size: 14px;
        }
    }
    span:nth-of-type(2) {
        font-size: 14px;
        color: rgb(31,31,31,.4);
        letter-spacing: 0.3px;
        display: block;
        ${media.xs} {
            font-size: 12px;
        }
    }
`;

const TicketInfo = styled.td`
    display: inline-flex;
    flex-flow: row nowrap;
    ${media.smPlus} {
        height: 85px;
        align-items: center;
    }
    img {
        width: 40px;
        height: auto;
        margin-right: 13px;
    }
    span:nth-of-type(1) {
        color: #000000;
        font-weight: 500;
        display: block;
        margin-bottom: 3px;
        width: 20%;
    }
    span:nth-of-type(2) {
        font-size: 14px;
        color: #1f1f1f;
        letter-spacing: 0.3px;
        opacity: 0.4;
        display: block;
    }
`;
