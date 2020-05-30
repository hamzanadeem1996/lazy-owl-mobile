import { 
    PERSISTENCE_KEY,
    FIRST_TIME_LOGIN
} from "../constants/index.js";

export function updateFirstTimeLogin(state) {
    return {
        type: FIRST_TIME_LOGIN,
        payload: state
    }
}

export function updatePersistenceKey(state) {
    return {
        type: PERSISTENCE_KEY,
        payload: state
    }
}