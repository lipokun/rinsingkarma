'use strict';

const BASE_URL = "http://www.risingkarma.com";

export default class Api {

    get(url, headers) {
        headers = headers || {};

        return fetch(BASE_URL + url, {
            headers : headers
        }).then((response) => response.json());
    }

    post(url, body, headers) {
        headers = headers || {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        return fetch(BASE_URL + url, {
            method : "POST",
            headers : headers,
            body : JSON.stringify(body)
        }).then((response) => response.json());
    }

}
