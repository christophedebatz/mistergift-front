/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = () => (state) => {
    return state.get('global');
};

const selectEntities = () => createSelector(
    selectGlobal(),
    (globalState) => globalState.get('entities')
);

const selectIndexes = () => createSelector(
    selectGlobal(),
    (globalState) => globalState.get('indexes')
);

const selectAllUsers = () => createSelector(
    selectEntities(),
    (entities) => denormalize(entities.get('users'), entities, schemas.users)
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
    selectLoading,
    selectError,
    selectIndexes,
    selectAllUsers,
    selectLocationState,
};
