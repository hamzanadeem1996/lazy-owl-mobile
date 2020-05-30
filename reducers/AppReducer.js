import { FIRST_TIME_LOGIN, PERSISTENCE_KEY } from '../constants';

const initialState = {
    firstTimeLogin: true,
    persistenceKey: null
};

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case FIRST_TIME_LOGIN:
            return {
                ...state,
                firstTimeLogin: action.payload
            }
        case PERSISTENCE_KEY:
            return {
                ...state,
                persistenceKey: action.payload
            }
        default:
            return state;
    }
}

export default appReducer;