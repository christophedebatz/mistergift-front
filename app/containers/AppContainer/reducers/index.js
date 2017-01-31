import { combineReducers } from 'redux-immutable';

import entities from './entities';
import register from './register';
import login from './login';

export default combineReducers({
    entities: entities,
    register: register,
    login: login
});
