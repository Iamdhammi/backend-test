import  * as t from '../types';

const initialState = {
    isLoggedin: false,
    isLoggedout: false,
    loading: false,
    user: {},
    errorMessage: '',
    successMessage: ''
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING_AUTH:
            return {
                ...state,
                loading: action.payload === 'auth' ? true : false,
            }
        case t.LOGIN_SUCCESS: 
            return {
                ...state,
                loading: false,
                isLoggedin: true,
                successMessage: action.payload,
            }
        case t.LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                isLoggedin: false,
                errorMessage: action.payload
            }
        case t.LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggedin: false,
            }
        case t.CLEAR_SUCCESS: 
            return {
                ...state,
                loading: false,
                isCreated: false,
                successMessage: '',
                errorMessage: '',
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

export default auth;