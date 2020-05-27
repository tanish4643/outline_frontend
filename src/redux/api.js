import { API } from './config';

export function apiEmployees () {
    return fetch(`${API}/users/employees`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json()).then(res => {console.log(res); return res; }).catch(res => { console.log(res);});
}

export function apiSurveys () {
    return fetch(`${API}/users/surveys`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json()).then(res => {console.log(res); return res; }).catch(res => { console.log(res);});
}

export function apiUpdate (params) {
    return fetch(`${API}/users/update`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    .then(res => res.json()).then(res => {console.log(res); return res; }).catch(res => { console.log(res);});
}