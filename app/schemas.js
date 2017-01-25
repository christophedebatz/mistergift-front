import { normalize, Schema, arrayOf } from 'normalizr';

const user = new Schema('users');

user.define({
    user: user
});

export default {
  	user: user,
  	users: arrayOf(user),
}

