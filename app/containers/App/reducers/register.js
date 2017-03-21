import Immutable from 'immutable'

import {
    REGISTER_SUCCESS,
    REGISTER_ERROR
} from '../constants';

const initialState = Immutable.fromJS({
    isRegistering: false,
    errorMessage: null
});

export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return state
                .set('isRegistering', true)
                .set('errorMessage', null);
        case REGISTER_ERROR:
            return state
                .set('isRegistering', false)
                .set('errorMessage', action.message);
        default:
            return state;
    }
}
