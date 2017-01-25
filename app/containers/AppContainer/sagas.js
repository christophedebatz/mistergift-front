import { take, actionChannel, call, put, select } from 'redux-saga/effects';

import {
    LOAD_ENTITIES,
    LOAD_ENTITY,
} from './constants';

import {
    entitiesLoaded,
    entityLoaded,
    eventsLoaded,
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

function* watchFetchEventsList() {
    const requestChan = yield actionChannel(LOAD_EVENTS);

    while (true) {
        yield take(requestChan);
        let url = '/events';
        const data = yield call(get, url);
        const events = new Immutable.Map(data.data);

        yield put(eventsLoaded(events));
    }
};


export default [
    watchFetchEntities,
    watchFetchEntity
];
