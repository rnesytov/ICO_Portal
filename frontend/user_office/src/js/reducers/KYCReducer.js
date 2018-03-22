import {
    GET_KYC_REQUEST,
    GET_KYC_SUCCESSFULL,
    SUBMIT_KYC_REQUEST,
    SUBMIT_KYC_SUCCESSFULL,
    SHOW_KYC_FORM,
    HIDE_KYC_FORM
} from '../types/KYCTypes'

const initialState = {
    state: null,
    isSubmiting: false,
    showForm: false,
    isFetched: false
}

export function KYCReducer(state = initialState, {type, payload, ...action}) {
    switch (type) {
        case GET_KYC_REQUEST:
            return {
                ...state
            }
        case GET_KYC_SUCCESSFULL:
            return {
                ...state,
                ...payload,
                isFetched: true
            }
        case SUBMIT_KYC_REQUEST:
            return {
                ...state,
                isSubmiting: true
            }
        case SUBMIT_KYC_SUCCESSFULL:
            return {
                ...state,
                isSubmiting: false,
                showForm: false
            }
        case SHOW_KYC_FORM:
            return {
                ...state,
                showForm: true
            }

        case HIDE_KYC_FORM:
            return {
                ...state,
                showForm: false
            }

        default:
            return state
    }
}
