import { browserHistory } from 'react-router';
import { take, actionChannel, call, put, select } from 'redux-saga/effects';

import {
    LOAD_ENTITIES,
    LOAD_ENTITY,
    REGISTER,
    LOGIN
} from './constants';

import {
    entitiesLoaded,
    entityLoaded,
    registerSuccess,
    registerError,
    loginSuccess,
    loginError
} from './actions';

import { get, getNormalized, post, postLogin } from '../../utils/contentProvider';

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

        const data = yield call(getNormalized, '/' + entityType + '/' + identifier + '?loadByFieldName=identifier', entityType);

        if (!data) {
            return;
        }

        yield put(entityLoaded(entityType, identifier, data));
     }
};

function* loginFlow() {
    const requestChan = yield actionChannel(LOGIN);

    while (true) {
        const { email, password } = yield take(requestChan);

        const response = yield call(postLogin, '/authenticate', {
            email: email,
            password: password
        });

        const payload = response.data.payload

        if (response.err) {
            yield put(loginError('error'));
        } else {
            localStorage.setItem('token', payload.session.token);
            localStorage.setItem('expireAt', payload.session.expireAt);

            forwardTo('/' + payload.name.toLowerCase());

            yield put(loginSuccess(payload.session.token));
        }
    }
};

function* registerFlow() {
    const requestChan = yield actionChannel(REGISTER);

    while (true) {
        const { name, email, password } = yield take(requestChan);

        const response = yield call(post, '/users', {
            name: name,
            email: email,
            password: password
        });

        const payload = response.data.payload

        if (response.err) {
            yield put(registerError('error'));
        } else {
            localStorage.setItem('token', payload.session.token);
            localStorage.setItem('expireAt', payload.session.expireAt);

            forwardTo('/' + payload.name.toLowerCase());

            yield put(registerSuccess(payload.session.token));
        }
    }
}

export default [
    watchFetchEntities,
    watchFetchEntity,
    loginFlow,
    registerFlow
];

function forwardTo(location) {
    browserHistory.push(location)
}
