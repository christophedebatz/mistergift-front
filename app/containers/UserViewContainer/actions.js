import { loadEntity } from '../AppContainer/actions';

export function loadUser(identifier) {
  	return loadEntity('user', identifier);
}



