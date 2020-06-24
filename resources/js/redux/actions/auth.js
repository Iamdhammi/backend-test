import * as t from '../types';
import axios from 'axios';
import Cookies from 'js-cookie';
import { baseConfig } from '../api/baseConfig';


export const login_user = credentials => dispatch => {
    dispatch({
        type: t.LOADING_AUTH,
        payload: "auth"
    });
    axios
    .post('/api/authenticate', credentials)
    .then(response => {
        console.log(response);
        localStorage.setItem('eventToken', response.data.access_token);
        localStorage.setItem('userEmail', response.data.email);
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
    baseConfig
    .post('/api/logout')
    .then(response => {
        localStorage.removeItem("eventToken");
        dispatch({
            type: t.LOGOUT_SUCCESS
        })
    })
    .catch(error => [
        dispatch({
            type: t.LOGOUT_ERROR
        })
    ])
}