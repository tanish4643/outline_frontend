import { delay } from 'redux-saga';
import { put, takeLatest, call, all } from 'redux-saga/effects';

import {
    FETCH_EMPLOYEES,
    FETCH_SURVEYS,
    FETCH_UPDATE
} from './constants';

import {
    setEmployees,
    setSurveys,
    setUpdate
} from './actions';

import {
    apiEmployees,
    apiSurveys,
    apiUpdate
} from './api';

const asyncEmployees = function* (payload) {
    const response = yield call(apiEmployees);
    yield put(setEmployees(response));
}

const sagaEmployees = function* () {
    yield takeLatest(FETCH_EMPLOYEES, asyncEmployees);
}

const asyncSurveys = function* (payload) {
    const response = yield call(apiSurveys);
    yield put(setSurveys(response));
}

const sagaSurveys = function* () {
    yield takeLatest(FETCH_SURVEYS, asyncSurveys);
}

const asyncUpdate = function* (payload) {
    const response = yield call(apiUpdate, payload.params);
    yield put(setUpdate(response));
}

const sagaUpdate = function* () {
    yield takeLatest(FETCH_UPDATE, asyncUpdate);
}

export default function* watchersRootSaga() {
    yield all ([
        sagaEmployees(),
        sagaSurveys(),
        sagaUpdate()
    ])
}