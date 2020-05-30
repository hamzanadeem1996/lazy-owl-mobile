import { SERVER_URL } from "../config/index.js";
import axios from 'axios';

const BASE_URL = SERVER_URL + "/api/";
const LOGIN_URL = BASE_URL + "auth/login";
const REGISTER_URL = BASE_URL + "auth/register";
const FORGET_PASSWORD_URL = BASE_URL + "password/create";
const UPLOAD_PROFILE_IMAGE = BASE_URL + "user/update/profile-image";
const UPDATE_USER = BASE_URL + "user/update";
const ACTIVE_DEGREES = BASE_URL + "education-degrees/all";
const UPDATE_EDUCATION = BASE_URL + "user/update/education";
const UPDATE_PORTFOLIO = BASE_URL + "user/update/portfolio";
const UPDATE_SERVICES = BASE_URL + "user/update/services";
const UPDATE_CARD_DETAILS = BASE_URL + "payment/card-details/add";
const GET_CARD_DETAILS = BASE_URL + "payment/credit-card/details/";
const CHARGE_USER = BASE_URL + "payment/charge";
const GET_TRANSACTIONS = BASE_URL + "payment/transactions-history/";
const GET_TASKS = BASE_URL + "user/tasks/";

const login = async (data) => { console.log(LOGIN_URL);
    return new Promise((resolve) => {
        let email = data.email;
        let password = data.password;
        
        fetch(LOGIN_URL, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
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

const uploadUserProfileImage = (data) => {
    return new Promise((resolve) => {

        fetch(UPLOAD_PROFILE_IMAGE, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': `Bearer ${data.token}`
            },
            method: 'POST',
            body: JSON.stringify({
                ...data
            })
        })
        .then((response) => {
            let responseJson = response.json();
            resolve(responseJson);
        })
        .catch((error) => {
            console.log("Upload profile image error :", error);
            resolve({status: 500});
        })
    })
}

const updateUserProfile = (data) => {
    return new Promise((resolve) => {
        fetch(UPDATE_USER, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': `Bearer ${data.token}`
            },
            method: 'POST',
            body: JSON.stringify({
                ...data
            })
        })
        .then((response) => {
            let responseJson = response.json();
            resolve(responseJson);
        })
        .catch((error) => {
            console.log("Update user profile error :", error);
            resolve({status: 500});
        })
    })
}

const getActiveDegrees = (data) => {
    return new Promise((resolve) => {
        fetch(ACTIVE_DEGREES, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': `Bearer ${data.token}`
            },
            method: 'GET',
        })
        .then((response) => {
            let responseJson = response.json();
            resolve(responseJson);
        })
        .catch((error) => {
            console.log("Get active degrees error :", error);
            resolve({status: 500});
        })
    })
}

const updateUserEducation = (data) => {
    return new Promise((resolve) => {
        fetch(UPDATE_EDUCATION, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': `Bearer ${data.token}`
            },
            method: 'POST',
            body: JSON.stringify({
                ...data
            })
        })
        .then((response) => {
            let responseJson = response.json();
            resolve(responseJson);
        })
        .catch((error) => {
            console.log("Update user education error :", error);
            resolve({status: 500});
        })
    })
}

const updateUserPortfolio = (data) => {
    return new Promise((resolve) => {
        fetch(UPDATE_PORTFOLIO, {
            headers: {
                Accept: 'application/json'   ,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': `Bearer ${data.token}`
            },
            method: 'POST',
            body: JSON.stringify({
                ...data
            })
        })
        .then((response) => {
            let responseJson = response.json();
            resolve(responseJson);
        })
        .catch((error) => {
            console.log("Update user portfolio error :", error);
            resolve({status: 500});
        })
    })
}

const updateUserServices = (data) => {
    return new Promise((resolve) => {
        fetch(UPDATE_SERVICES, {
            headers: {
                Accept: 'application/json'   ,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': `Bearer ${data.token}`
            },
            method: 'POST',
            body: JSON.stringify({
                ...data
            })
        })
        .then((response) => {
            let responseJson = response.json();
            resolve(responseJson);
        })
        .catch((error) => {
            console.log("Update user services error :", error);
            resolve({status: 500});
        })
    }) 
}

const updateUserCardDetails = (data) => {
    return new Promise((resolve) => {
        fetch(UPDATE_CARD_DETAILS, {
            headers: {
                Accept: 'application/json'   ,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': `Bearer ${data.token}`
            },
            method: 'POST',
            body: JSON.stringify({
                ...data
            })
        })
        .then((response) => {
            let responseJson = response.json();
            resolve(responseJson);
        })
        .catch((error) => {
            console.log("Update user card details error :", error);
            resolve({status: 500});
        })
    }) 
}

const getUserCardDetails = (data) => {
    return new Promise((resolve) => {
        fetch(GET_CARD_DETAILS + data.id, {
            headers: {
                Accept: 'application/json'   ,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': `Bearer ${data.token}`
            },
            method: 'GET',
        })
        .then((response) => {
            let responseJson = response.json();
            resolve(responseJson);
        })
        .catch((error) => {
            console.log("Get user card details error :", error);
            resolve({status: 500});
        })
    }) 
}

const chargeUserPayment = (data) => {
    return new Promise((resolve) => {
        fetch(CHARGE_USER, {
            headers: {
                Accept: 'application/json'   ,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': `Bearer ${data.token}`
            },
            method: 'POST',
            body: JSON.stringify({
                ...data
            })
        })
        .then((response) => {
            let responseJson = response.json();
            resolve(responseJson);
        })
        .catch((error) => {
            console.log("Charge user error :", error);
            resolve({status: 500});
        })
    }) 
}

const getUserTransactions = (data) => {
    return new Promise((resolve) => {
        fetch(GET_TRANSACTIONS + data.id, {
            headers: {
                Accept: 'application/json'   ,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': `Bearer ${data.token}`
            },
            method: 'GET',
        })
        .then((response) => {
            let responseJson = response.json();
            resolve(responseJson);
        })
        .catch((error) => {
            console.log("Get user transactions error :", error);
            resolve({status: 500});
        })
    })
}

const getUserTasks = (data) => {
    return new Promise((resolve) => {
        // let URL = null;
        // if (data.page) {
        //     URL = `?page=${data.page}&limit=${data.limit}`;
        // } else {
        //     URL = `?limit=${data.limit}`;
        // }
        fetch(GET_TASKS + data.id, {
            headers: {
                Accept: 'application/json'   ,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': `Bearer ${data.token}`
            },
            method: 'GET',
        })
        .then((response) => {
            let responseJson = response.json();
            resolve(responseJson);
        })
        .catch((error) => {
            console.log("Get user tasks error :", error);
            resolve({status: 500});
        })
    })
}

export { 
    login, 
    register, 
    forgetPassword, 
    uploadUserProfileImage, 
    updateUserProfile, 
    getActiveDegrees, 
    updateUserEducation,
    updateUserPortfolio,
    updateUserServices,
    updateUserCardDetails,
    getUserCardDetails,
    chargeUserPayment,
    getUserTransactions,
    getUserTasks
 };