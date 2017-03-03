import { fromJS } from 'immutable';

import {
    LOAD_CURRENT_USER_SUCCESS,
    LOAD_CURRENT_USER_ERROR
} from '../constants';

const initialState = fromJS({
    data: null,
    isLoaded: false,
    errorMessage: null
});

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CURRENT_USER_SUCCESS:
            return state
                .set('data', action.data)
                .set('isLoaded', true)
                .set('errorMessage', null);
        case LOAD_CURRENT_USER_ERROR:
            return state
                .set('data', null)
                .set('isLoaded', false)
                .set('errorMessage', action.message);
        default:
            return state;
    }
}
