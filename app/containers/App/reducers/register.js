import Immutable from 'immutable'

import {
    REGISTER_SUCCESS,
    REGISTER_ERROR
} from '../constants';

const localStorageToken = localStorage.getItem('token');

const initialState = Immutable.fromJS({
    isRegistering: false,
    token: localStorageToken,
    errorMessage: null
});

export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return state
                .set('isRegistering', true)
                .set('token', action.token)
                .set('errorMessage', null);
        case REGISTER_ERROR:
            return state
                .set('isRegistering', false)
                .set('token', null)
                .set('errorMessage', action.message);
        default:
            return state;
    }
}
