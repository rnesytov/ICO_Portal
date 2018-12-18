import API from 'api';
import axios from 'axios'
import {extractAccount} from 'globalWeb3'
import {call, cps, put, takeEvery} from 'redux-saga/effects'
import * as UserActions from 'js/actions/UserActions'
import * as UIActions from 'js/actions/UIActions'

export class UserSagas {
    static* setAccount(action) {
        try {
            yield call(axios, {
                method: 'POST',
                url: API.setEthAccount(),
                data: {
                    'eth_account': action.payload
                }
            })

            yield put(UserActions.setAccountSuccessfull());
            yield put(UIActions.hideSetAccountPopup());
            yield put(UserActions.getUserRequest());
        } catch (e) {
            let error;
            if (e.response.data.error.includes('Duplicate entry')) {
                error = 'ETH Account already exists.';
            } else if (e.response.data.error.includes('hexadecimal')) {
                error = 'Invalid account address.'
            } else {
                error = 'Something went wrong, please try again later.'
            }
            yield put(UserActions.setAccountFailed(error));
        }
    }

    static* getUser() {
        try {
            const response = yield call(axios, {
                url: API.getMe(),
                method: 'GET'
            })

            yield put(UserActions.getUserSuccessfull(response.data))

        } catch (e) {
            yield put(UserActions.getUserFailed())
        }
    }

    static* extractMetaMaskAccount(action) {
        try {
            const accounts = yield cps(extractAccount)
            if (accounts.length !== 0) {
                yield put(UserActions.setMetaMaskAccountSuccessfull(accounts[0]))
            }
        } catch (e) {
            yield put(UserActions.setMetaMaskAccountFailed)
        }
    }

    static* changePassword(action) {
        try {
            const response = yield call(axios, {
                url: API.changePassword(),
                method: 'POST',
                data: action.payload
            })

            yield put(UserActions.changePasswordSuccessfull())
            yield put(UIActions.showModal({
                modalHead: 'Congratulations',
                modalContent: 'You\'ve successfully change your password!'
            }));
        } catch (e) {
            yield put(UserActions.changePasswordFailed())
            yield put(UIActions.showModal({
                modalHead: 'Warning',
                modalContent: 'Something went wrong... Please, check if the passwords are valid!'
            }));
        }
    }

    static * changeEmail(action) {
        try {
            yield call(axios, {
                url: API.changeEmail(),
                method: 'POST',
                data: action.payload
            })

            yield put(UserActions.changeEmailSuccessfull())
            yield put(UserActions.getUserRequest())
            yield put(UIActions.showModal({
                modalHead: 'Congratulations',
                modalContent: 'You\'ve successfully sent your request for change of email! Check your email and follow the instructions!'
            }));
        } catch (e) {
            yield put(UserActions.changeEmailFailed())
        }
    }
}


export function* saga() {
    yield takeEvery(UserActions.getUserRequest, UserSagas.getUser)
    yield takeEvery(UserActions.setAccountRequest, UserSagas.setAccount)
    yield takeEvery(UserActions.setMetaMaskAccountRequest, UserSagas.extractMetaMaskAccount)
    yield takeEvery(UserActions.changePasswordRequest, UserSagas.changePassword)
    yield takeEvery(UserActions.changeEmailRequest, UserSagas.changeEmail)
}
