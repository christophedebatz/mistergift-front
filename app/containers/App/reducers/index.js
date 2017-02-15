import { combineReducers } from 'redux-immutable';

import entities from './entities';
import indexes from './indexes';
import login from './login';
import register from './register';

export default combineReducers({
    entities: entities,
    indexes: indexes,
    login: login,
    register: register,
});
