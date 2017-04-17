import { fromJS } from 'immutable'

import {
    LOAD_USER_SUCCESS,
    LOAD_USER_ERROR,
    LOAD_USER_WISHLIST_SUCCESS,
    LOAD_USER_WISHLIST_ERROR
} from '../constants';

const initialState = fromJS({
    data: null,
    isLoaded: false,
    errorMessage: null
});

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USER_SUCCESS:
            return state
                .set('data', action.data)
                .set('isLoaded', true)
                .set('errorMessage', null);
        case LOAD_USER_ERROR:
            return state
                .set('data', null)
                .set('isLoaded', false)
                .set('errorMessage', action.message);
        case LOAD_USER_WISHLIST_SUCCESS:
            return state
                .set('wishlist', action.data)
                .set('wishlistLoaded', true)
                .set('errorMessage', null);
        case LOAD_USER_WISHLIST_ERROR:
            return state
                .set('wishlist', null)
                .set('wishlistLoaded', false)
                .set('errorMessage', action.message);
        default:
            return state;
    }
}
