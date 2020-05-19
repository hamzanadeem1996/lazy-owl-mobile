import { SERVER_URL } from "../config/index.js";

const BASE_URL = SERVER_URL + "/api/";
const LOGIN_URL = BASE_URL + "auth/login"
const REGISTER_URL = BASE_URL + "auth/register"
const FORGET_PASSWORD_URL = BASE_URL + "password/create"

const login = async (data) => { console.log(LOGIN_URL);
    return new Promise((resolve) => {
        let email = data.email;
        let password = data.password;
        
        fetch(LOGIN_URL, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
        .then((response) => {
            let responseJson = response.json();
            resolve(responseJson);
        })
        .catch((error) => {
            console.log("Login error :", error);
            resolve({status: 500});
        })
    });
}

const register = (data) => { console.log(REGISTER_URL); console.log(data);
    return new Promise((resolve) => {

        let name = data.name;
        let email = data.email;
        let password = data.password;
        let password_confirmation = data.password_confirmation;
        let role = data.role;

        fetch(REGISTER_URL, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                password_confirmation: password_confirmation,
                role: role
            })
        })
        .then((response) => {
            let responseJson = response.json();
            resolve(responseJson);
        })
        .catch((error) => {
            console.log("Register error :", error);
            resolve({status: 500});
        })
    });
}

const forgetPassword = (data) => {
    return new Promise((resolve) => {
        let email = data.email;

        fetch(FORGET_PASSWORD_URL, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            method: 'POST',
            body: JSON.stringify({
                email: email,
            })
        })
        .then((response) => {
            let responseJson = response.json();
            resolve(responseJson);
        })
        .catch((error) => {
            console.log("Forget Password error :", error);
            resolve({status: 500});
        })
    });
}

export { login, register, forgetPassword };