import axios from 'axios'
import API from 'api'
import { takeEvery, call, put, select} from 'redux-saga/effects';
import * as actions from 'js/actions/DepositsActions';

export class DepositsSagas {
    static * getTokensMoves() {
        try {
            const page = yield select(state => state.deposits.get('current_page'))

            const response = yield call(axios, {
                method: 'GET',
                url: API.getDeposits()
            })

            yield put(actions.getDepositsSuccess(response.data))
        } catch(e) {
            yield put(actions.getDepositsFailed())
        }
    }

    static * createPreparedDeposit(action) {
        try {
            const {value, txnHash, currency} = action.payload;

            yield call(axios, {
                url: API.prepareDeposits(),
                method: 'POST',
                data: {
                    value: value,
                    txn_hash: txnHash,
                    currency: currency
                }
            })

            yield put(actions.createPreparedDepositSuccess())
            yield put(actions.getDepositsRequest())
        } catch(e) {
            yield put(actions.createPreparedDepositFailed())
        }
    }

    static * incrementCurrentPage() {
        try {

            yield put(actions.executeIncrementCurrentPage());
            yield put(actions.getDepositsRequest());
        } catch(e) {
            console.error(e);
        }
    }

    static * decrementCurrentPage() {
        try {

            yield put(actions.executeDecrementCurrentPage());
            yield put(actions.getDepositsRequest());
        } catch(e) {
            console.error(e);
        }
    }
}

export function* saga() {
    yield takeEvery(actions.getDepositsRequest, DepositsSagas.getTokensMoves);
    yield takeEvery(actions.createPreparedDepositRequest, DepositsSagas.createPreparedDeposit);
    yield takeEvery(actions.requestIncrementCurrentPage, DepositsSagas.incrementCurrentPage);
    yield takeEvery(actions.requestDecrementCurrentPage, DepositsSagas.decrementCurrentPage);
}
