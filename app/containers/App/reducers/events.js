import { fromJS } from 'immutable'

import {
    LOAD_USER_EVENTS_SUCCESS,
    LOAD_USER_EVENTS_ERROR
} from '../constants';

const initialState = fromJS({
    data: null,
    isLoaded: false,
    errorMessage: null
});

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USER_EVENTS_SUCCESS:
            return state
                .set('data', action.data)
                .set('isLoaded', true)
                .set('errorMessage', null);
        case LOAD_USER_EVENTS_ERROR:
            return state
                .set('data', null)
                .set('isLoaded', false)
                .set('errorMessage', action.message);
        default:
            return state;
    }
}
