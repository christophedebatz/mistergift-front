import { browserHistory } from 'react-router';
import { take, actionChannel, call, put, select } from 'redux-saga/effects';
import Auth from '../auth';

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

import {get, getNormalized, post} from '../../utils/contentProvider';

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

        const payload = yield call(post, '/authenticate', {
            email: email,
            password: password
        });

        if (payload.err) {
            yield put(loginError('error'));
        } else {
            yield put(loginSuccess(payload.session.token));
        }
    }
};

function* registerFlow() {
    const requestChan = yield actionChannel(REGISTER);

    while (true) {
        const { name, email, password } = yield take(requestChan);

        const payload = yield call(post, '/users', {
            name: name,
            email: email,
            password: password
        });

        if (payload.err) {
            yield put(registerError('error'));
        } else {
            console.log('youyou');
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
