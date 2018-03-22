import axios from 'axios'
import Api from '../../api'
//types
import {
    SHOW_KYC_FORM,
    HIDE_KYC_FORM,
    GET_KYC_REQUEST,
    GET_KYC_SUCCESSFULL,
    SUBMIT_KYC_REQUEST,
    SUBMIT_KYC_SUCCESSFULL
} from '../types/KYCTypes'

export default class KYCActions {
    static showForm() {
        return (dispatch) => {
            dispatch({type: SHOW_KYC_FORM})
        }
    }

    static hideForm() {
        return (dispatch) => {
            dispatch({type: HIDE_KYC_FORM})
        }
    }

    static getKYCRequest() {
        return {
            type: GET_KYC_REQUEST
        }
    }

    static getKYCSuccessfull(payload) {
        return {
            type: GET_KYC_SUCCESSFULL,
            payload
        }
    }

    static getKYC() {
        return (dispatch) => {
            dispatch(KYCActions.getKYCRequest())
            axios({
                url: Api.kyc(),
                method: 'GET'
            }).then(({data}) => {
                dispatch(KYCActions.getKYCSuccessfull(data))
            }).catch(error => {
                console.log("cant fetch kyc", {error})
            })
        }
    }

    static submitKYCRequest() {
        return {
            type: SUBMIT_KYC_REQUEST
        }
    }

    static submitKYCSuccessfull() {
        return {
            type: SUBMIT_KYC_SUCCESSFULL
        }
    }

    static submitKYC(data) {
        return (dispatch) => {
            dispatch(KYCActions.submitKYCRequest())
            return axios({
                url: Api.kyc(),
                method: 'POST',
                data: data
            }).then(() => {
                dispatch(KYCActions.submitKYCSuccessfull())
            }).catch(error => {
                console.log("cant submit kyc", {error})
            })
        }
    }
}
