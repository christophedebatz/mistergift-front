import { loadEntity } from '../App/actions';

export function loadUser(identifier) {
  	return loadEntity('user', identifier);
}



