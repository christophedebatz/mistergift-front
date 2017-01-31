import request from './request';
import { normalize, Schema, arrayOf } from 'normalizr';
import { take, call, put, select } from 'redux-saga/effects';

import schemas from '../schemas';
import queryString from 'query-string';

import {getConfig} from './config';

const apiBaseUrl = getConfig('apiBaseUrl');

const options = {
    assignEntity: function(obj, key, val) {
        if (['id', 'user', 'event', 'wishlist'].includes(key)) {
            val = parseInt(val);
        }

        obj[key] = val;
    }
};

export function get(url, query = {}) {
    let queryClone = Object.assign({}, query);
    delete queryClone.name;

    const search = queryString.stringify(queryClone);

    let fullUrl = apiBaseUrl + url;

    if (search) {
        fullUrl = fullUrl + '?' + search;
    }

    return request(fullUrl);
}

export function post(url, params = {}) {
    let fullUrl = apiBaseUrl + url;

    return request(fullUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    });
}

export function getNormalized(url, schemaName, query = {}) {
    return get(url, query).then((response) => {
        return normalize(response.data.data, schemas[schemaName], options)
    });
}

