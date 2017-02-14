import { combineReducers } from 'redux-immutable';

import {
    LOAD_ENTITIES_SUCCESS
} from '../constants';
import Immutable from 'immutable';

const createIndexByIdentifierForEntityType = (entityType) => function(state = Immutable.Map(), action) {
    switch (action.type) {
        case LOAD_ENTITIES_SUCCESS:
            if (!action.data.entities.hasOwnProperty(entityType)) {
                return state;
            }

            const entities = action.data.entities[entityType];

            Object.keys(entities).forEach((key) => {
                const entity = entities[key];
                state = state.set(entity.identifier, entity.id);
            });

            return state;

        default:
            return state;
    }
}

export default combineReducers({
    users: combineReducers({
        identifier: createIndexByIdentifierForEntityType('users'),
    }),
});
