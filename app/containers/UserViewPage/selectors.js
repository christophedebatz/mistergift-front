import { createSelector } from 'reselect';
import { selectIndexes, selectAllUsers } from '../App/selectors';

const getCurrentUserId = (state, props) => props.params.userId

const findUser = (indexes, users, userId) => {
    if (!users || !indexes.get('users').get('userId')) {
        return null;
    }

    const id = indexes.get('users').get('userId').get(userId);

    if (!id) {
        return null;
    }

    return users.get(id.toString());
};

const selectCurrentUser = createSelector(
    [
        selectIndexes(),
        selectAllUsers(),
        getCurrentUserId
    ],

    findUser
)

export {
  	selectCurrentUser,
};
