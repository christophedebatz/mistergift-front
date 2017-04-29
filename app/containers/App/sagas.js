import { browserHistory } from 'react-router'
import { take, actionChannel, call, put, select } from 'redux-saga/effects'

import {
    REGISTER,
    LOGIN,
    LOAD_CURRENT_USER,
    LOAD_USER,
    LOAD_USER_WISHLIST,
    LOAD_USER_SETTINGS,
    UPDATE_USER,
    LOAD_EVENTS,
    EVENT_CREATION,
    START_USER_SESSION
} from './constants';

import {
    registerSuccess,
    registerError,
    loginSuccess,
    loginError,
    loadUserWishlist,
    userWishlistLoaded,
    userWishlistError,
    loadCurrentUser,
    currentUserLoaded,
    userLoaded,
    userError,
    userSettingsLoaded,
    updateUserSuccess,
    updateUserError,
    eventsLoaded,
    eventCreationSuccess,
    eventCreationError,
    productCreation,
    productCreationSuccess,
    productCreationError,
    userGiftCreation,
    userGiftCreationSuccess,
    userGiftCreationError
} from './actions';

import { get, post, update, postLogin, postRegister } from '../../utils/contentProvider';

function* watchFetchLogin() {
    const requestChan = yield actionChannel(LOGIN);

    while (true) {
        try {
            const { email, password } = yield take(requestChan);

            const response = yield call(postLogin, '/authenticate', {
                email: email,
                password: password
            });

            if (response.error) {
                yield put(loginError(response.error));
            } else {
                const payload = response.data.payload;

                localStorage.setItem('session', JSON.stringify(payload.session));
                localStorage.setItem('user', JSON.stringify({data: payload.user}));

                yield put(loginSuccess(payload.session.token));
                yield put(currentUserLoaded(payload.user));

                forwardTo('/' + payload.user.id);
            }
        } catch(error) {
            yield put(loginError(error));
        }
    }
};

function* watchFetchRegister() {
    const requestChan = yield actionChannel(REGISTER);

    while (true) {
        const { firstName, lastName, email, password } = yield take(requestChan);

        const response = yield call(postRegister, '/users', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        });

        if (response.error) {
            yield put(registerError(response.error));
        } else {
            yield put(registerSuccess());

            forwardTo('/login');
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

        // const currentUser = yield call(get, '/me/');
        const currentUser = JSON.parse(localStorage.getItem('user'));

        if (!currentUser) {
            return;
        }

        yield put(currentUserLoaded(currentUser.data));
     }
};

function* watchFetchUser() {
    const requestChan = yield actionChannel(LOAD_USER);

    while (true) {
        try {
            const { userId } = yield take(requestChan);

            const user = yield call(get, '/users/' + userId);

            if (!user) {
                return;
            }

            yield put(userLoaded(user.data));
        } catch(error) {
            yield put(userError('error'));
        }
     }
};

function* watchFetchUserWishlist() {
    const requestChan = yield actionChannel(LOAD_USER_WISHLIST);

    while (true) {
        try {
            const { userId } = yield take(requestChan);

            const user = yield call(get, '/users/' + userId + '/gifts');

            if (!user) {
                return;
            }

            yield put(userWishlistLoaded(user.data.content));
        } catch(error) {
            yield put(userWishlistError('error'));
        }
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

function* watchFetchEvents() {
    const requestChan = yield actionChannel(LOAD_EVENTS);

    while (true) {
        const action = yield take(requestChan);
        const events = yield call(get, '/me/events?&page=1');

        if (!events) {
            return;
        }

        yield put(eventsLoaded(events.data));
     }
};

function* watchFetchEventCreation() {
    const requestChan = yield actionChannel(EVENT_CREATION);

    while (true) {
        try {
            const { request } = yield take(requestChan);

            const response = yield call(post, '/events', request);

            const payload = response.data;

            if (response.error) {
                yield put(eventCreationError(response.error));
            } else {
                yield put(eventCreationSuccess());

                forwardTo('/events/' + payload.id);
            }
        } catch(error) {
            yield put(eventCreationError(error));
        }
    }
}

function* watchFetchProductCreation() {
    const requestChan = yield actionChannel(EVENT_CREATION);

    while (true) {
        try {
            const { request } = yield take(requestChan);

            const response = yield call(post, '/products', request);

            const payload = response.data;

            if (response.error) {
                yield put(productCreationError(response.error));
            } else {
                yield put(productCreationSuccess());
                yield put(userGiftCreationSuccess());
            }
        } catch(error) {
            yield put(productCreationError(error));
        }
    }
}

export default [
    watchFetchLogin,
    watchFetchRegister,
    watchStartUserSession,
    watchFetchCurrentUser,
    watchFetchUser,
    watchFetchUserWishlist,
    watchFetchUserSettings,
    watchUpdateUser,
    watchFetchEvents,
    watchFetchEventCreation
];

function forwardTo(location) {
    browserHistory.push(location)
}
