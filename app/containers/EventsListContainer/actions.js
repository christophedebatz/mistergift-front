import { loadEntity } from '../AppContainer/actions';

export function loadEvents(identifier) {
  	return loadEntity('events', identifier);
}



