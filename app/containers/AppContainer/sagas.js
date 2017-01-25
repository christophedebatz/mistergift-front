import { take, actionChannel, call, put, select } from 'redux-saga/effects';

import {
    LOAD_ENTITIES,
    LOAD_ENTITY,
} from './constants';

import {
    entitiesLoaded,
    entityLoaded,
} from './actions';

import {get, getNormalized} from '../../utils/contentProvider';

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

export default [
    watchFetchEntities,
    watchFetchEntity
];
