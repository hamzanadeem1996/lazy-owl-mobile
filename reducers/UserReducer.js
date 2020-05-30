import { LOGIN_USER } from '../constants';

const initialState = {
    user: null,
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_USER:
            return {
                user: action.payload
            };
        default:
            return state;
    }
}

export default userReducer;