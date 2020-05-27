import { fromJS, List } from 'immutable';
import { handleActions } from 'redux-actions';

import {
    SET_EMPLOYEES,
    SET_SURVEYS,
    SET_UPDATE
} from './constants';

const initialState = fromJS({
	employees: null,
    surveys: null,
    update: null
});

export default function sales (state = initialState, action) {
    switch (action.type) {
    	case SET_EMPLOYEES:
    		return state.set('employees',action.res);
        case SET_SURVEYS:
            return state.set('surveys',action.res);
        case SET_UPDATE:
            return state.set('update',action.res);
        default:
            return state;
    }
}
