import axios from 'axios'
import API from 'api'
import * as KYCActions from 'js/actions/KYCActions'
import * as UIActions from 'js/actions/UIActions'
import {call, put, takeEvery} from 'redux-saga/effects'

export class KYCSagas {
    static * submitKYC(action) {

        const type = action.payload.state;
        const method = type !== 'WAITING' ? "POST" : "PUT";
        try {
            yield call(axios, {
                url: API.kyc(),
                method: method,
                data: action.payload.form
            });
            yield put(KYCActions.submitKYCSuccessfull());
            yield call(KYCSagas.getKYC);

        } catch(e) {
            yield put(KYCActions.submitKYCFailed())
            yield put(UIActions.showModal({
                modalHead: 'Warning',
                modalContent: 'Something went wrong. Check if you submitted correct data and try again!'
            }));
        }
    }

    static * submitKYC_and_retriveKYC(data) {
        try {
            yield call(KYCSagas.submitKYC, data)
            yield call(KYCSagas.getKYC)
        } catch(e) {
            console.log("CANT SUBMIT AND FETCH KYC")
        }
    }

    static * getKYC() {
        try {
            const response = yield call(axios, {
                url: API.kyc(),
                method: 'GET'
            })
            yield put(KYCActions.getKYCSuccessfull(response.data))
        } catch(e) {
            yield put(KYCActions.getKYCFailed())
        }
    }
}

export function* saga() {
    yield takeEvery(KYCActions.getKYCRequest, KYCSagas.getKYC)
    yield takeEvery(KYCActions.submitKYCRequest, KYCSagas.submitKYC)
    yield takeEvery(KYCActions.submitKYC_and_retriveKYC_Request, KYCSagas.submitKYC_and_retriveKYC)
}
