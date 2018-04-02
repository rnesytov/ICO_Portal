import {all} from 'redux-saga/effects'

import {saga as ICOPhaseSaga} from './js/actions/ICOInfoActions'
import {saga as BountiesBalanceSaga} from './js/actions/BountiesBalanceActions'
import {saga as DepositeSaga} from './js/actions/DepositsActions'
import {saga as UserSaga} from './js/actions/UserActions'
import {saga as KYCSaga} from './js/actions/KYCActions'
import {saga as ReferalsAction} from './js/actions/ReferalsAction'


export default function* rootSaga() {
    yield all([
        ICOPhaseSaga(),
        BountiesBalanceSaga(),
        DepositeSaga(),
        UserSaga(),
        KYCSaga(),
        ReferalsAction()
    ])
}