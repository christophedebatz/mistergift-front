/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux'
import { fromJS } from 'immutable'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import createReducer from './reducers'

import appSagas from './containers/App/sagas.js'

const sagaMiddleware = createSagaMiddleware();
const devtools = window.devToolsExtension || (() => noop => noop);

export default function configureStore(initialState = {}, history) {
    // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    // 2. routerMiddleware: Syncs the location/URL path to the state
    const middlewares = [
        sagaMiddleware,
        routerMiddleware(history),
    ];

    const enhancers = [
        applyMiddleware(...middlewares),
        devtools(),
    ];

    const store = createStore(
        createReducer(),
        fromJS(initialState),
        compose(...enhancers)
    );

    appSagas.map(sagaMiddleware.run);

    // Extensions
    store.runSaga = sagaMiddleware.run;
    store.asyncReducers = {}; // Async reducer registry

    // Make reducers hot reloadable, see http://mxs.is/googmo
    /* istanbul ignore next */
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers').default; // eslint-disable-line global-require
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
