import { browserHistory } from 'react-router';
import { take, actionChannel, call, put, select } from 'redux-saga/effects';

import {
    LOAD_ENTITIES,
    LOAD_ENTITY,
    REGISTER,
    LOGIN,
    LOAD_USER,
    LOAD_USER_EVENTS,
    LOAD_USER_SETTINGS,
    UPDATE_USER
} from './constants';

import {
    entitiesLoaded,
    entityLoaded,
    registerSuccess,
    registerError,
    loginSuccess,
    loginError,
    userLoaded,
    userEventsLoaded,
    userSettingsLoaded,
    updateUserSuccess,
    updateUserError
} from './actions';

import { get, getNormalized, post, update, postLogin } from '../../utils/contentProvider';

function* watchFetchEntities() {
    const requestChan = yield actionChannel(LOAD_ENTITIES);

    while (true) {
        const {entityType, query, ids} = yield take(requestChan);
        let url = '/' + entityType;

        if (ids) {
            url = url + '/' + ids.join(',');
        }

        const data = yield call(getNormalized, url, entityType, query);

        yield put(entitiesLoaded(entityType, query, data));
    }
};

function* watchFetchEntity() {
    const requestChan = yield actionChannel(LOAD_ENTITY);

    while (true) {
        const { entityType, identifier } = yield take(requestChan);

        const data = yield call(getNormalized, '/' + entityType + '/' + identifier, entityType);

        if (!data) {
            return;
        }

        yield put(entityLoaded(entityType, identifier, data));
     }
};

function* watchFetchLogin() {
    const requestChan = yield actionChannel(LOGIN);

    while (true) {
        const { email, password } = yield take(requestChan);

        const data = yield call(postLogin, '/authenticate', {
            email: email,
            password: password
        });

        if (data.err) {
            yield put(loginError('error'));
        } else {
            const payload = data.data.payload;

            localStorage.setItem('token', payload.session.token);
            localStorage.setItem('expireAt', payload.session.expireAt);

            forwardTo('/' + payload.id);

            yield put(loginSuccess(payload.session.token));
        }
    }
};

function* watchFetchRegister() {
    const requestChan = yield actionChannel(REGISTER);

    while (true) {
        const { firstName, lastName, email, password } = yield take(requestChan);

        const response = yield call(post, '/users', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        });

        const payload = response.data.payload

        if (response.err) {
            yield put(registerError('error'));
        } else {
            localStorage.setItem('token', payload.session.token);
            localStorage.setItem('expireAt', payload.session.expireAt);

            forwardTo('/' + payload.id);

            yield put(registerSuccess(payload.session.token));
        }
    }
}

function* watchFetchUser() {
    const requestChan = yield actionChannel(LOAD_USER);

    while (true) {
        const { userId } = yield take(requestChan);

        const data = yield call(get, '/users/' + userId);

        if (!data) {
            return;
        }

        yield put(userLoaded('users', userId, data));
     }
};

function* watchFetchUserEvents() {
    const requestChan = yield actionChannel(LOAD_USER_EVENTS);

    while (true) {
        const action = yield take(requestChan);
        const data = yield call(get, '/me/events');

        if (!data) {
            return;
        }

        yield put(userEventsLoaded('events', data));
     }
};

function* watchFetchUserSettings() {
    const requestChan = yield actionChannel(LOAD_USER_SETTINGS);

    while (true) {
        const action = yield take(requestChan);
        const data = yield call(get, '/me');

        if (!data) {
            return;
        }

        yield put(userSettingsLoaded('users', data));
     }
};

function* watchUpdateUser() {
    const requestChan = yield actionChannel(UPDATE_USER);

    while (true) {
        const { firstName, lastName, email, password } = yield take(requestChan);

        const data = yield call(update, '/me', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        });

        if (data.err) {
            yield put(updateUserError(data.err.message));
        } else {
            const payload = data.data.payload;

            localStorage.setItem('token', payload.session.token);
            localStorage.setItem('expireAt', payload.session.expireAt);

            forwardTo('/' + payload.id);

            yield put(updateUserSuccess());
        }
     }
};

export default [
    watchFetchEntities,
    watchFetchEntity,
    watchFetchLogin,
    watchFetchRegister,
    watchFetchUser,
    watchFetchUserEvents,
    watchFetchUserSettings,
    watchUpdateUser
];

function forwardTo(location) {
    browserHistory.push(location)
}
