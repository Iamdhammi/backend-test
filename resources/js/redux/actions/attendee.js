import * as t from '../types';
import { baseConfig } from '../api/baseConfig';


export const create_attendee = data => dispatch => {
    dispatch({
        type: t.LOADING_AUTH,
        payload: 'attendee'
    })
    baseConfig
    .post('/api/create-attendee', data)
    .then(response => {
        dispatch({
            type: t.CREATE_ATTENDEE_SUCCESS,
            payload: response.data.message
        })
    })
    .catch(error => {
        if(error.response.data.message.email){
            dispatch({
                type: t.CREATE_ATTENDEE_ERROR,
                payload: error.response.data.message.email[0]
            })
        } else {
            dispatch({
                type: t.CREATE_ATTENDEE_ERROR,
                payload: 'Oops! An error occured'
            })
        }
    })
}

export const get_all_attendees = () => dispatch => {
    dispatch({
        type: t.LOADING_AUTH,
        payload: 'attendee'
    });
    baseConfig
    .get('/api/attendees')
    .then(response => {
        dispatch({
            type: t.FETCH_ATTENDEES_SUCCESS,
            payload: response.data.attendees
        })
    })
    .catch(error => {
        dispatch({
            type: t.FETCH_ATTENDEES_ERROR,
            payload: 'Oops! An error occured'
        })
    })
}

export const delete_attendee = id => dispatch => {
    baseConfig
    .delete(`/api/attendees/delete/${id}`)
    .then( response => {
        console.log(response);
        dispatch({
            type: t.DELETE_ATTENDEE_SUCCESS,
            payload: response.data.message
        })
    })
    .catch(error => {
        console.log(error.response);
        dispatch({
            type: t.DELETE_ATTENDEE_ERROR,
            payload: error.response.data.message
        })
    })
}
