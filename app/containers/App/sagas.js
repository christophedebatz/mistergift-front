import { browserHistory } from 'react-router';
import { take, actionChannel, call, put, select } from 'redux-saga/effects';

import {
    REGISTER,
    LOGIN,
    LOAD_USER,
    LOAD_USER_EVENTS,
    LOAD_USER_SETTINGS,
    UPDATE_USER
} from './constants';

import {
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

        const user = yield call(get, '/users/' + userId);

        if (!user) {
            return;
        }

        yield put(userLoaded(user.data));
     }
};

function* watchFetchUserEvents() {
    const requestChan = yield actionChannel(LOAD_USER_EVENTS);

    while (true) {
        const action = yield take(requestChan);
        const data = yield call(get, '/me/events?page=1');

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
        const user = yield call(get, '/me');

        if (!user) {
            return;
        }

        yield put(userSettingsLoaded(user.data));
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

            forwardTo('/' + payload.id);

            yield put(updateUserSuccess());
        }
     }
};

export default [
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
