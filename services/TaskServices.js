import { SERVER_URL } from "../config/index.js";
import { getUserData } from "../database/index.js";

const BASE_URL = SERVER_URL + "/api/";
const UNASSIGNED_TASKS_URL = BASE_URL + "project/active";
const BID_ON_TASK_URL = BASE_URL + "project/bid";
const GET_CATEGORIES_URL = BASE_URL + "services/all";

const getLoggedInUser = (userId) => {
    return new Promise((resolve) => {
        getUserData(userId).then(response => {
            if (!response) {
                console.log("User not found");
                resolve(null);
            } else {
                resolve(response);
            }
        });
    });
}

const getUnassignedTasks = (userId, page, limit) => {
    return new Promise((resolve) => {
        getLoggedInUser(userId).then(response => {
            if (response) {
                fetch(UNASSIGNED_TASKS_URL + `?page=${page}&limit=${limit}`, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'Authorization': `Bearer ${response.token}`
                    },
                    method: 'GET',
                })
                .then((response) => {
                    let responseJson = response.json();
                    resolve(responseJson);
                })
                .catch((error) => {
                    console.log("Unassigned task error :", error);
                    resolve({status: 500});
                })
            }
        });  
    });
};

const postBidOnTask = (data) => {
    return new Promise((resolve) => {
        let projectId = data.projectId;
        let userId = data.userId;
        let token = data.token;
        let amount = data.amount;

        fetch(BID_ON_TASK_URL, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': `Bearer ${token}`
            },
            method: 'POST',
            body: JSON.stringify({
                project_id: projectId,
                user_id: userId,
                amount: amount
            })
        })
        .then((response) => {
            let responseJson = response.json();
            resolve(responseJson);
        })
        .catch((error) => {
            console.log("Post bid on task error :", error);
            resolve({status: 500});
        })
    })
}

const getCategories = (token) => {
    return new Promise((resolve) => {
        fetch(GET_CATEGORIES_URL, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': `Bearer ${token}`
            },
            method: 'GET'
        })
        .then((response) => {
            let responseJson = response.json();
            resolve(responseJson);
        })
        .catch((error) => {
            console.log("Get categories error :", error);
            resolve({status: 500});
        })
    })
}

export { getUnassignedTasks, postBidOnTask, getCategories };