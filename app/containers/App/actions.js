import {
    REGISTER,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOAD_CURRENT_USER,
    LOAD_CURRENT_USER_SUCCESS,
    LOAD_CURRENT_USER_ERROR,
    LOAD_USER,
    LOAD_USER_SUCCESS,
    LOAD_USER_ERROR,
    LOAD_USER_SETTINGS,
    LOAD_USER_SETTINGS_SUCCESS,
    LOAD_EVENTS,
    LOAD_EVENTS_SUCCESS,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    EVENT_CREATION,
    EVENT_CREATION_SUCCESS,
    EVENT_CREATION_ERROR,
    START_USER_SESSION,
} from './constants'

export function register(firstName, lastName, email, password) {
    return {
        type: REGISTER,
        firstName,
        lastName,
        email,
        password
    }
}

export function registerSuccess(token) {
    return {
        type: REGISTER_SUCCESS,
        token
    }
}

export function registerError(message) {
    return {
        type: REGISTER_ERROR,
        message
    }
}

export function login(email, password) {
    return {
        type: LOGIN,
        email,
        password
    }
}

export function loginSuccess(token) {
    return {
        type: LOGIN_SUCCESS,
        token
    }
}

export function loginError(message) {
    return {
        type: LOGIN_ERROR,
        message
    }
}

export function loadCurrentUser() {
    return {
        type: LOAD_CURRENT_USER
    }
}

export function currentUserLoaded(data) {
    return {
        type: LOAD_CURRENT_USER_SUCCESS,
        data
    }
}


export function loadUser(userId) {
    return {
        type: LOAD_USER,
        userId
    }
}

export function userLoaded(data) {
    return {
        type: LOAD_USER_SUCCESS,
        data
    }
}

export function loadUserSettings(data) {
    return {
        type: LOAD_USER_SETTINGS,
        data
    }
}

export function userSettingsLoaded(data) {
    return {
        type: LOAD_USER_SETTINGS_SUCCESS,
        data
    }
}

export function updateUser(firstName, lastName, email, password) {
    return {
        type: UPDATE_USER,
        firstName,
        lastName,
        email,
        password
    }
}

export function updateUserSuccess() {
    return {
        type: UPDATE_USER_SUCCESS,
        data
    }
}

export function updateUserError(message) {
    return {
        type: UPDATE_USER_ERROR,
        message
    }
}

export function loadEvents() {
    return {
        type: LOAD_EVENTS
    }
}

export function eventsLoaded(data) {
    return {
        type: LOAD_EVENTS_SUCCESS,
        data
    }
}

export function eventCreation(name) {
    return {
        type: EVENT_CREATION,
        name
    }
}

export function eventCreationSuccess() {
    return {
        type: EVENT_CREATION_SUCCESS
    }
}

export function eventCreationError(message) {
    return {
        type: EVENT_CREATION_ERROR,
        message
    }
}

export function startUserSession(token) {
    return {
        type: START_USER_SESSION,
        token
    }
}
