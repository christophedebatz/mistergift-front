import {
    LOAD_ENTITIES,
    LOAD_ENTITIES_SUCCESS,
    LOAD_ENTITIES_ERROR,
    LOAD_ENTITY,
    LOAD_ENTITY_SUCCESS,
    LOAD_ENTITY_ERROR,
    REGISTER,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOAD_USER,
    LOAD_USER_SUCCESS,
    LOAD_USER_ERROR
} from './constants';

export function loadEntities(entityType, query, ids) {
    return {
        type: LOAD_ENTITIES,
        entityType,
        query,
        ids,
    };
}

export function loadEntity(entityType, identifier) {
    return {
        type: LOAD_ENTITY,
        entityType,
        identifier,
    };
}

export function entitiesLoaded(entityType, query, data) {
    return {
        type: LOAD_ENTITIES_SUCCESS,
        entityType,
        query,
        data
    }
}

export function entityLoaded(entityType, identifier, data) {
    return {
        type: LOAD_ENTITIES_SUCCESS,
        entityType,
        identifier,
        data
    }
}

export function register(name, email, password) {
    return {
        type: REGISTER,
        name,
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

export function userLoaded(entityType, userId, data) {
    console.log(entityType);
    console.log(userId);
    console.log('data', data);
    return {
        type: LOAD_USER_SUCCESS,
        entityType,
        userId,
        data
    }
}
