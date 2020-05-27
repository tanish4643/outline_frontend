import { createAction } from 'redux-actions';

import {
    FETCH_EMPLOYEES,
    FETCH_SURVEYS,
    FETCH_UPDATE,

    SET_EMPLOYEES,
    SET_SURVEYS,
    SET_UPDATE,
} from './constants';

export function fetchEmployees() {
    return {
        type: FETCH_EMPLOYEES
    };
};

export function setEmployees(res) {
    return {
        type : SET_EMPLOYEES,
        res  : res
    };
};

export function fetchSurveys() {
    return {
        type: FETCH_SURVEYS
    };
};

export function setSurveys(res) {
    return {
        type : SET_SURVEYS,
        res  : res
    };
};

export function fetchUpdate(params) {
    return {
        type: FETCH_UPDATE,
        params: params
    };
};

export function setUpdate(res) {
    return {
        type : SET_UPDATE,
        res  : res
    };
};