import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/UserReducer.js';

const rootReducer = combineReducers(
    { 
        user: userReducer, 
    },
    {
        updateFirstTimeLogin: userReducer 
    }
);

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;