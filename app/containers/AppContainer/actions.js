import {
    LOAD_ENTITIES,
    LOAD_ENTITIES_SUCCESS,
    LOAD_ENTITIES_ERROR,
    LOAD_ENTITY,
    LOAD_ENTITY_SUCCESS
} from './constants';

function loadEntities(entityType, query, ids) {
    return {
        type: LOAD_ENTITIES,
        entityType,
        query,
        ids,
    };
}

export function loadEntity(entityType, identifier) {
    return {
        type: LOAD_ENTITY,
        entityType,
        identifier,
    };
}


export function entitiesLoaded(entityType, query, data) {
    return {
        type: LOAD_ENTITIES_SUCCESS,
        entityType,
        query,
        data,
    }
}


export function entityLoaded(entityType, identifier, data) {
    return {
        type: LOAD_ENTITIES_SUCCESS,
        entityType,
        identifier,
        data,
    }
}
