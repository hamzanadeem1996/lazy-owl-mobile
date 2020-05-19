import { LOGIN_USER, FIRST_TIME_LOGIN } from '../constants/index.js';

export function updateUser(user) {
    return {
        type: LOGIN_USER,
        payload: user
    }
}

export function updateFirstTimeLogin(state) {
    return {
        type: FIRST_TIME_LOGIN,
        payload: state
    }
}