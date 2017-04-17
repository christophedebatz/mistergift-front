import Immutable from 'immutable'

import {
    LOGIN_SUCCESS,
    LOGIN_ERROR
} from '../constants';

const localStorageSession = JSON.parse(localStorage.getItem('session')) || {};

const initialState = Immutable.fromJS({
    loggedIn: !!localStorageSession.token,
    token: localStorageSession.token,
    errorMessage: null
});

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return state
                .set('loggedIn', true)
                .set('token', action.token)
                .set('errorMessage', null);
        case LOGIN_ERROR:
            return state
                .set('loggedIn', false)
                .set('token', null)
                .set('errorMessage', action.message);
        default:
            return state;
    }
}
