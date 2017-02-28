import { combineReducers } from 'redux-immutable';

import login from './login';
import register from './register';
import user from './user';

export default combineReducers({
    login: login,
    register: register,
    user: user
});
