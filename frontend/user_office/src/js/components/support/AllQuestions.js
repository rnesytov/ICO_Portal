import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux'
import $ from "jquery";

import Ticket from './components/Ticket';

import * as TicketActions from './../../actions/TicketActions';


class AllQuestions extends React.Component {

    renderTickets = () => {
        const {tickets, email, getSelectedTicket} = this.props;

        return tickets.map((item, index) => {
            return <Ticket
                email={email}
                key={index}
                id={item.id}
                status={item.status}
                title={item.title}
                lastReplyBy={item.last_reply_by}
                lastReplyAt={item.last_reply_at}
                created={item.created}
                onClickHandler={getSelectedTicket}
            />
        })
    }

    render() {
        return (
            <Wrapper>
                <TicketsList>
                    <tbody>{this.renderTickets()}</tbody>
                </TicketsList>
            </Wrapper>
        )
    }
}

const mapStateToProps = ({tickets, user}) => ({
    tickets: tickets.get('results'),
    email: user.get('email'),
});

const mapDispatchToProps = (dispatch) => ({
    getSelectedTicket(payload) {
        dispatch(TicketActions.getSelectedTicket(payload))
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(AllQuestions)

const Wrapper = styled.div`
    flex: 1;
    height: auto;
    padding: 50px 50px 65px;
    background: white;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.03);
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
`;

const TicketsList = styled.table`
    width: 100%;
`;

const Head = styled.h3`
    font-size: 22px;
    font-weight: 500;
    letter-spacing: 0.1px;
    color: #323c47;
`;