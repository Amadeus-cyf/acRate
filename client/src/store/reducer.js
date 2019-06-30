import {combineReducers} from 'redux';
import defaultState from './state.js';

function currentUser (state = defaultState.currentUser, action) {
    switch(action.type) {
        case 'SET_CURRENT_USER':
            try {
                sessionStorage.setItem('currentUser', JSON.stringify(action.data))
            } catch(err) {
                if(err.name === 'QuotaExceededError'){
                    sessionStorage.removeItem('currentUser');
                    sessionStorage.setItem('currentUser', JSON.stringify(action.data));
                }
            }
            return action.data
        case 'USER_LOGOUT':
            sessionStorage.removeItem('currentUser')
            return state
        default:
            if (sessionStorage.getItem('currentUser')) {
                return JSON.parse(sessionStorage.getItem('currentUser'));
            }
            return state
    }
}

function user (state = defaultState.user, action) {
    switch(action.type) {
        case 'SET_USER':
            try {
                sessionStorage.setItem('user', JSON.stringify(action.data))
            } catch(err) {
                if(err.name === 'QuotaExceededError'){
                    sessionStorage.removeItem('user');
                    sessionStorage.setItem('user', JSON.stringify(action.data));
                }
            }
            return action.data
        case 'CLEAR_USER':  
            sessionStorage.removeItem('user')
            return action.data
        default:
            if (sessionStorage.getItem('user')) {
                return JSON.parse(sessionStorage.getItem('user'));
            }
            return state
    }
}

export default combineReducers({
    currentUser,
    user,
})