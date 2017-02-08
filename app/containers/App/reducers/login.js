import { combineReducers } from 'redux-immutable';

import {
    LOGIN_SUCCESS,
    LOGIN_ERROR
} from '../constants';

import Immutable from 'immutable';

const localStorageToken = localStorage.getItem('token');

const initialState = Immutable.fromJS({
    isLogged: localStorageToken !== null,
    token: localStorageToken,
    errorMessage: null
});

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return state
                .set('isLogged', true)
                .set('token', action.token)
                .set('errorMessage', null);
        case LOGIN_ERROR:
            return state
                .set('isLogged', false)
                .set('token', null)
                .set('errorMessage', action.message);
        default:
            return state;
    }
}
