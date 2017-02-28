import { combineReducers } from 'redux-immutable'

import login from './login'
import register from './register'
import user from './user'
import settings from './settings'

export default combineReducers({
    login: login,
    register: register,
    user: user,
    settings: settings
});
