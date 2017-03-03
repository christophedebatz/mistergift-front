import { combineReducers } from 'redux-immutable'

import login from './login'
import register from './register'
import currentUser from './currentUser'
import user from './user'
import settings from './settings'
import events from './events'

export default combineReducers({
    login: login,
    register: register,
    currentUser: currentUser,
    user: user,
    settings: settings,
    events: events
});
