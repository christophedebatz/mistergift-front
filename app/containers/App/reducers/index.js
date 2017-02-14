import { combineReducers } from 'redux-immutable';

import entities from './entities';
import indexes from './indexes';
import lists from './lists';
import login from './login';
import register from './register';

export default combineReducers({
    entities: entities,
    indexes: indexes,
    lists: lists,
    login: login,
    register: register,
});
