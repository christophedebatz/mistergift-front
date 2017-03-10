import { browserHistory } from 'react-router'
import { take, actionChannel, call, put, select } from 'redux-saga/effects'

import {
    REGISTER,
    LOGIN,
    LOAD_CURRENT_USER,
    LOAD_USER,
    LOAD_USER_SETTINGS,
    UPDATE_USER,
    LOAD_USER_EVENTS,
    EVENT_CREATION,
    START_USER_SESSION
} from './constants';

import {
    registerSuccess,
    registerError,
    loginSuccess,
    loginError,
    loadCurrentUser,
    currentUserLoaded,
    userLoaded,
    userSettingsLoaded,
    updateUserSuccess,
    updateUserError,
    userEventsLoaded,
    eventCreationSuccess,
    eventCreationError
} from './actions';

import { get, post, update, postLogin } from '../../utils/contentProvider';

function* watchFetchLogin() {
    const requestChan = yield actionChannel(LOGIN);

    while (true) {
        try {
            const { email, password } = yield take(requestChan);

            const response = yield call(postLogin, '/authenticate', {
                email: email,
                password: password
            });

            if (response.err) {
                yield put(loginError(response.err));
            } else {
                const payload = response.data.payload;

                localStorage.setItem('token', payload.session.token);
                localStorage.setItem('expireAt', payload.session.expireAt);

                forwardTo('/' + payload.id);

                yield put(loadCurrentUser());
                yield put(loginSuccess(payload.session.token));
            }
        } catch(error) {
            yield put(loginError(error));
        }
    }
};

function* watchFetchRegister() {
    const requestChan = yield actionChannel(REGISTER);

    while (true) {
        try {
            const { firstName, lastName, email, password } = yield take(requestChan);

            const response = yield call(post, '/users', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            });

            if (response.err) {
                yield put(registerError(data.err));
            } else {
                const payload = response.data.payload;

                localStorage.setItem('token', payload.session.token);
                localStorage.setItem('expireAt', payload.session.expireAt);

                forwardTo('/' + payload.id);

                yield put(registerSuccess(payload.session.token));
            }
        } catch(error) {
            yield put(registerError(error));
        }
    }
}

function* watchStartUserSession() {
    const requestChan = yield actionChannel(START_USER_SESSION);

    while (true) {
        const { token } = yield take(requestChan);

        if (token) {
            yield put(loadCurrentUser());
        }
    }
};

function* watchFetchCurrentUser() {
    const requestChan = yield actionChannel(LOAD_CURRENT_USER);

    while (true) {
        const action = yield take(requestChan);

        const currentUser = yield call(get, '/me/');

        if (!currentUser) {
            return;
        }

        yield put(currentUserLoaded(currentUser.data));
     }
};

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

function* watchFetchUserEvents() {
    const requestChan = yield actionChannel(LOAD_USER_EVENTS);

    while (true) {
        const action = yield take(requestChan);
        const events = yield call(get, '/me/events?filters=published&page=1');

        if (!events) {
            return;
        }

        yield put(userEventsLoaded(events.data));
     }
};

function* watchFetchEventCreation() {
    const requestChan = yield actionChannel(EVENT_CREATION);

    while (true) {
        const { name } = yield take(requestChan);

        const response = yield call(post, '/events', {
            name: name
        });

        const payload = response.data.payload

        if (response.err) {
            yield put(eventCreationError('error'));
        } else {
            forwardTo('/' + payload.id);

            yield put(eventCreationSuccess());
        }
    }
}

export default [
    watchFetchLogin,
    watchFetchRegister,
    watchStartUserSession,
    watchFetchCurrentUser,
    watchFetchUser,
    watchFetchUserSettings,
    watchUpdateUser,
    watchFetchUserEvents,
    watchFetchEventCreation
];

function forwardTo(location) {
    browserHistory.push(location)
}
