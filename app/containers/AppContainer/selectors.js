/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = () => (state) => {
    return state.get('global');
};

const selectRegister = () => createSelector(
    selectGlobal(),
    (globalState) => globalState.get('register')
);

const selectLogin = () => createSelector(
    selectGlobal(),
    (globalState) => globalState.get('login')
);

const selectLocationState = () => {
    let prevRoutingState;
    let prevRoutingStateJS;

    return (state) => {
        const routingState = state.get('route'); // or state.route

        if (!routingState.equals(prevRoutingState)) {
            prevRoutingState = routingState;
            prevRoutingStateJS = routingState.toJS();
        }

        return prevRoutingStateJS;
    };
};

export {
    selectGlobal,
    selectRegister,
    selectLogin,
    selectLocationState
};
