import axios from 'axios'
import Api from '../../api'
import {call, put, takeEvery} from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as ticketActions from './../actions/TicketActions';
import * as UIActions from './../actions/UIActions';
import * as FilesActions from './../actions/FilesActions';
import history from './../utils/history';

export class TicketsSagas {
    static* getTickets() {
        try {
            const response = yield call(axios, {
                method: 'GET',
                url: Api.getTickets(),
            });
            yield put(ticketActions.getTicketsSuccess(response.data))
        } catch (e) {
            yield put(ticketActions.getTicketsFailed())
         }
    }

    static* getSelectedTicket(id) {
        try {
            const res = yield call(axios, {
                method: 'GET',
                url: Api.getTicket(id.payload),
            });
            yield put(ticketActions.getSelectedTicketSuccess(res.data))
        } catch (e) {
            yield put(ticketActions.getSelectedTicketFailed())
        }
    }


    static* createNewTicket(ticket) {
        try {
            const res = yield call(axios, {
                method: 'POST',
                url: Api.newTicket(),
                data: ticket.payload
            });
            yield put(ticketActions.getTicketsRequest());
            yield history.push('/user_office/support/ticket/' + res.data.id);
            yield put(ticketActions.getSelectedTicket(res.data.id));
            yield put(UIActions.changeActiveTab(2));
            yield put(FilesActions.clearNewTicketFiles());
        } catch (e) {
            yield put(ticketActions.createNewTicketFailed());
        }
    }

    static* createNewComment(comment) {
        try {
            yield call(axios, {
                method: 'POST',
                url: Api.newComment(comment.payload.get('ticket')),
                data: comment.payload
            });
            yield put(ticketActions.createNewCommentSuccess());
            yield put(ticketActions.getSelectedTicket(comment.payload.get('ticket')));
            yield put(FilesActions.clearCommentFiles());
        } catch (e) {
            yield put(ticketActions.createNewCommentFailed());
        }
    }
}

export function* saga() {
    yield takeEvery(ticketActions.getTicketsRequest, TicketsSagas.getTickets);
    yield takeEvery(ticketActions.getSelectedTicket, TicketsSagas.getSelectedTicket);
    yield takeEvery(ticketActions.createNewTicket, TicketsSagas.createNewTicket);
    yield takeEvery(ticketActions.createNewComment, TicketsSagas.createNewComment);
}
