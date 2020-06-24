import  * as t from '../types';

const initialState = {
    loading: false,
    errorMessage: '',
    successMessage: '',
    attendees: null
}

const attendee = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING_AUTH:
            return {
                ...state,
                loading: action.payload === 'attendee' ? true : false,
            }
        case t.CREATE_ATTENDEE_SUCCESS: 
            return {
                ...state,
                successMessage: action.payload,
                loading: false
            }
        case t.CREATE_ATTENDEE_ERROR:
            return {
                ...state,
                errorMessage: action.payload,
                loading: false
            }
        case t.FETCH_ATTENDEES_SUCCESS:
            return {
                ...state,
                attendees: action.payload,
                loading: false
            }
        case t.FETCH_ATTENDEES_ERROR:
            return {
                ...state,
                errorMessage: action.payload,
                loading: false
            }
        case t.DELETE_ATTENDEE_SUCCESS:
            return {
                ...state,
                successMessage: action.payload
            }
        case t.DELETE_ATTENDEE_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            }
        case t.CLEAR_SUCCESS: 
            return {
                ...state,
                loading: false,
                successMessage: '',
            }
        case t.CLEAR_ERROR: 
            return {
                ...state,
                loading: false,
                errorMessage: '',
            }
        default:
            return state
    }
}

export default attendee;