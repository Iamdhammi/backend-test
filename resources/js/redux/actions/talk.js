import * as t from '../types';
import { baseConfig } from '../api/baseConfig';


export const create_talk = data => dispatch => {
    dispatch({
        type: t.LOADING_AUTH,
        payload: 'talk'
    })
    baseConfig
    .post('/api/create-talk', data)
    .then(response => {
        dispatch({
            type: t.CREATE_TALK_SUCCESS,
            payload: response.data.message
        })
    })
    .catch(error => {
        dispatch({
            type: t.CREATE_TALK_ERROR,
            payload: 'Oops! An error occurred'
        })
    })
}

export const get_all_talks = () => dispatch => {
    dispatch({
        type: t.LOADING_AUTH,
        payload: 'talk'
    });
    baseConfig
    .get('/api/talks')
    .then(response => {
        dispatch({
            type: t.FETCH_TALKS_SUCCESS,
            payload: response.data.talks
        })
    })
    .catch(error => {
        dispatch({
            type: t.FETCH_TALKS_ERROR,
            payload: 'Oops! An error occured'
        })
    })
}

export const delete_talk = id => dispatch => {
    baseConfig
    .delete(`/api/talks/${id}`)
    .then( response => {
        console.log(response);
        dispatch({
            type: t.DELETE_TALK_SUCCESS,
            payload: response.data.message
        })
    })
    .catch(error => {
        console.log(error.response);
        dispatch({
            type: t.DELETE_TALK_ERROR,
            payload: error.response.data.message
        })
    })
}