import  * as t from '../types';

const initialState = {
    loading: false,
    errorMessage: '',
    successMessage: '',
    talks: null
}

const talk = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING_AUTH:
            return {
                ...state,
                loading: action.payload === 'talk' ? true : false,
            }
        case t.CREATE_TALK_SUCCESS: 
            return {
                ...state,
                successMessage: action.payload,
                loading: false
            }
        case t.CREATE_TALK_ERROR:
            return {
                ...state,
                errorMessage: action.payload,
                loading: false
            }
        case t.FETCH_TALKS_SUCCESS:
            return {
                ...state,
                talks: action.payload,
                loading: false
            }
        case t.FETCH_TALKS_ERROR:
            return {
                ...state,
                errorMessage: action.payload,
                loading: false
            }
        case t.DELETE_TALK_SUCCESS:
            return {
                ...state,
                successMessage: action.payload
            }
        case t.DELETE_TALK_ERROR:
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

export default talk;