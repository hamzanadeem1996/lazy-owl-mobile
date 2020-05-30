import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/UserReducer.js';
import appReducer from '../reducers/AppReducer.js'

const rootReducer = combineReducers(
    { 
        UserReducer: userReducer, 
        AppReducer: appReducer
    }
);

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;