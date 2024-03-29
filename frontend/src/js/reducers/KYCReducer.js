import { createReducer } from 'redux-act';
import * as actions from 'js/actions/KYCActions';
import {Map} from 'immutable'


const initialState = Map({
    state: null,
    type: '',
    firstname: "",
    lastname: "",
    birthdate: "",
    country: "",
    city: "",
    registration_address: "",
    postcode: "",
    document_type: "",
    document_no: "",
    document_country: "",
    document_date: "",
    document_photo: "",
    decline_reason: "",
    place_of_birth: "",
    personal_id: "",
    place_of_residence: "",
    profession: "",
    business_name: "",
    registration_number: "",
    registration_date: "",
    phone_number: "",
    director_firstname: "",
    director_lastname: "",
    email: "",
    address: "",
    field_of_activity: "",
    beneficial_fullname: "",
    beneficial_personal_id: "",
    beneficial_birthdate: "",
    beneficial_place_of_birth: "",
    beneficial_place_of_residence: "",
    is_pep: false,
    attachments: null,
    isSubmiting: false,
    isLoading: false
});


export const KYCReducer = createReducer({
    [actions.getKYCRequest]: (state) => state.set('isLoading', true),
    [actions.getKYCFailed]: (state) => state.set('isLoading', false),
    [actions.getKYCSuccessfull]: (state, payload) => {
        return state.merge(payload).set('isFetched', true).set('isLoading', false)
    },

    [actions.submitKYCRequest]: (state) => state.set('isSubmiting', true),
    [actions.submitKYCFailed]: (state) => state.set('isSubmiting', false),
    [actions.submitKYCSuccessfull]: (state) => {
        return state
            .set('isSubmiting', false)
            .set('showForm', false)
    },

    [actions.showForm]: (state) => state.set('showForm', true),
    [actions.hideForm]: (state) => state.set('showForm', false),
    [actions.changeType]: (state, payload) => state.set('showForm', payload),

    [actions.uploadPhoto]: (state, payload) => {
        let {name, data} = payload;

        if (name === 'user_photo') return state.set('uploaded_user_photo', data)
        else if (name === 'document_photo') return state.set('uploaded_doc_photo', data)
    },
    [actions.removePhoto]: (state, payload) => {
        let name = payload;
        if (name === 'user_photo') return state.set('uploaded_user_photo', null);
        else if (name === 'document_photo') return state.set('uploaded_doc_photo', null);
    },
}, initialState);
