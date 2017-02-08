import { createSelector } from 'reselect';
// import { selectIndexes, selectAllUsers } from '../App/selectors';

const getCurrentUserIdentifier = (state, props) => props.params.identifier

const findUser = (indexes, users, identifier) => {
    if (!users || !indexes.get('users').get('identifier')) {
        return null;
    }

    const id = indexes.get('users').get('identifier').get(identifier);

    if (!id) {
        return null;
    }

    return users.get(id.toString());
};

const selectCurrentUser = createSelector(
    [
        getCurrentUserIdentifier
    ],

    findUser
)

export {
  	selectCurrentUser,
};
