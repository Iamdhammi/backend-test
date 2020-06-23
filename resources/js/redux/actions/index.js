import * as t from '../types';

export const clear_success = () => dispatch => {
    dispatch({
        type: t.CLEAR_SUCCESS
    });
};

export const clear_error = () => dispatch => {
    dispatch({
        type: t.CLEAR_ERROR
    })
};

