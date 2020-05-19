import { LOGIN_USER, FIRST_TIME_LOGIN } from '../constants';

const initialState = {
    user: null,
    firstTimeLogin: false
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload
            };
        case FIRST_TIME_LOGIN:
            return {
                firstTimeLogin: true
            }
        default:
            return state;
    }
}

export default userReducer;