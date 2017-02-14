import { combineReducers } from 'redux-immutable';

import {
    LOAD_ENTITIES_SUCCESS
} from '../constants';

import Immutable from 'immutable';

const createListReducerForEntityType = (entityType) => (state = Immutable.Map(), action) => {
    switch (action.type) {
        case LOAD_ENTITIES_SUCCESS:
            if (!action.query || action.entityType != entityType || typeof action.query.name === 'undefined') {
                return state;
            }

            return state.set(action.query.name, Immutable.List(action.data.result));

        default:
            return state;
    }
}

export default combineReducers({
    users: createListReducerForEntityType('users'),
});
