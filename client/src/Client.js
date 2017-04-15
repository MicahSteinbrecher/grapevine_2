/* eslint-disable no-undef */
export const GetEvents = (data, cb) => {
    console.log('searching...');
    console.log(data);
    return fetch(`get/events?accessToken=${data.auth.accessToken}`, {
        credentials: 'same-origin',
        accept: 'application/json',
    }).then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

export const SetLocation = (location, cb) => {
    console.log('setting location...');
    console.log(location);
    return fetch(`set/location?lat=${location.lat}&lng=${location.lng}`, {
        credentials: 'same-origin',
        accept: 'application/json',
    }).then(checkStatus)
        .then(cb);
}

export const RequestAuthorization = (cb) => {
    console.log('requesting authorization');
    return fetch(`get/accessCode`, {
        credentials: 'same-origin',
        accept: 'application/json',
    }).then(checkStatus)
        .then(cb);
}

export const RequestAppId = (cb) => {
    console.log('requesting app ID');
    return fetch(`get/facebookAppId`, {
        credentials: 'same-origin',
        accept: 'application/json',
    }).then(checkStatus)
        .then(parseJSON)
        .then(cb);
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(error); // eslint-disable-line no-console
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}
