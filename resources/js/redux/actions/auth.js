import * as t from '../types';
import axios from 'axios';
import Cookies from 'js-cookie';


export const login_user = credentials => dispatch => {
    dispatch({
        type: t.LOADING_AUTH,
        payload: "auth"
    });
    axios
    .post('/api/authenticate', credentials)
    .then(response => {
        console.log(response);
        localStorage.setItem('eventToken', response.data.access_token)
        dispatch({
            type: t.LOGIN_SUCCESS,
            payload: response.data.message
        })
    })
    .catch(error => {
        console.log(error.response)
        dispatch({
            type: t.LOGIN_ERROR,
            payload: error.response.data.message
        });
    })
}

export const logout_user = () => dispatch => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    dispatch({
        type: t.LOGOUT_SUCCESS
    })
}