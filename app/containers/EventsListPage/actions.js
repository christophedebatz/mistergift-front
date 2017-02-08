import { loadEntity } from '../App/actions';

export function loadEvents(identifier) {
  	return loadEntity('events', identifier);
}



