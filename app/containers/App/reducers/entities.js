import { combineReducers } from 'redux-immutable';

import {
    LOAD_ENTITIES_SUCCESS
} from '../constants';

import Immutable from 'immutable';

const createEntitiesReducerForEntityType = (entityType) => (state = Immutable.Map(), action) => {
    switch (action.type) {
        case LOAD_ENTITIES_SUCCESS:
            if (!action.data.entities.hasOwnProperty(entityType)) {
                return state;
            }

            return state.merge(action.data.entities[entityType]);

        default:
            return state;
    }
}

export default combineReducers({
    events: createEntitiesReducerForEntityType('events'),
});

