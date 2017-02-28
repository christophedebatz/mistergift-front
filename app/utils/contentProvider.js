import request from './request';
import { normalize, Schema, arrayOf } from 'normalizr';
import { take, call, put, select } from 'redux-saga/effects';

import queryString from 'query-string';

import { getConfig } from './config';

const apiBaseUrl = getConfig('apiBaseUrl');

const options = {
    assignEntity: function(obj, key, val) {
        if (['id'].includes(key)) {
            val = parseInt(val);
        }

        obj[key] = val;
    }
};

export function get(url, query = {}) {
    let fullUrl = apiBaseUrl + url;

    return request(fullUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-MG-AUTH': localStorage.getItem('token')
        }
    });
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

export function postLogin(url, params = {}) {
    let fullUrl = apiBaseUrl + url;
    let data = new URLSearchParams()

    data.set('email', params.email)
    data.set('password', params.password)

    return request(fullUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    });
}

export function update(url, params = {}) {
    let fullUrl = apiBaseUrl + url;

    return request(fullUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    });
}
