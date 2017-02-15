/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { denormalize } from 'denormalizr-immutable';
import schemas from '../../schemas';

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

const selectRegister = () => createSelector(
    selectGlobal(),
    (globalState) => globalState.get('register')
);

const selectLogin = () => createSelector(
    selectGlobal(),
    (globalState) => globalState.get('login')
);

const selectAllUsers = () => createSelector(
    selectGlobal(),
    (globalState) => globalState.get('users')
);

const selectUser = () => createSelector(
    selectAllUsers(),
    (users) => users
        .filter((user) => user.get('userId'))
);

const selectUserEvents = () => createSelector(
    selectGlobal(),
    (globalState) => globalState.get('settings')
);

const selectUserSettings = () => createSelector(
    selectGlobal(),
    (globalState) => globalState.get('settings')
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
    selectIndexes,
    selectAllUsers,
    selectUser,
    selectUserEvents,
    selectUserSettings,
    selectLocationState,
};
