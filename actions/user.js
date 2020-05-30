import { LOGIN_USER } from '../constants/index.js';

export function updateUser(user) {
    return {
        type: LOGIN_USER,
        payload: user
    }
}
