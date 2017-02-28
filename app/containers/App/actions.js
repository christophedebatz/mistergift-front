import {
    REGISTER,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOAD_USER,
    LOAD_USER_SUCCESS,
    LOAD_USER_ERROR,
    LOAD_USER_SETTINGS,
    LOAD_USER_SETTINGS_SUCCESS,
    LOAD_USER_EVENTS,
    LOAD_USER_EVENTS_SUCCESS,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
} from './constants';

export function register(firstName, lastName, email, password) {
    return {
        type: REGISTER,
        firstName,
        lastName,
        email,
        password
    }
}

export function registerSuccess() {
    return {
        type: REGISTER_SUCCESS,
        data
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

export function loadUserEvents(data) {
    return {
        type: LOAD_USER_EVENTS,
        data
    }
}

export function userEventsLoaded(data) {
    return {
        type: LOAD_USER_EVENTS_SUCCESS,
        data
    }
}
