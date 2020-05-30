import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const createDataBase = () => {
    return new Promise((resolve) => {
        db.transaction(function(txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='user';",
                [],
                (tx, results) => {
                    console.log('Results user', results.rowsAffected);
                    if (results.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS user', []);
                        txn.executeSql(
                            `CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, role INTEGER, token VARCHAR(1024) DEFAULT NULL)`,
                            [],
                            (tx, response) => {
                                console.log("This is database creation response :", response);
                                resolve(response);
                            }
                        );
                    }
                }
            );
        });
    });
    
}

const checkFirstLogin = () => {
    return new Promise((resolve) => {
        db.transaction(function(txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='user';",
                [],
                (tx, response) => {
                    if (response.rows.length === 0) {
                        console.log("This is first login");
                        resolve(true);
                    } else {
                        console.log("This is not first login");
                        resolve(false);
                    }
                }
            );
        });
    });
}

const saveUserData = (data) => { console.log("inside save user to database"); 
    return new Promise((resolve) => {
        if (data) {
            db.transaction(function(txn) {
                txn.executeSql(
                    `SELECT * FROM user WHERE user_id = ${data.id}`,
                    [],
                    (tx, userData) => { console.log(userData)
                        if (userData.rows.length === 0) {
                            txn.executeSql(
                                "INSERT INTO user (user_id, role, token) VALUES (:user_id, :role, :token)",
                                [data.id, data.role, data.token],
                                (tx, results) => { console.log("Save user to database", results);
                                    if (results.rowsAffected > 0) {
                                        resolve(true);
                                    } else {
                                        resolve(false);
                                    }
                                }
                            )
                        } else {
                            resolve(true);
                        }
                    }
                )
            });
        } else {
            resolve(false)
        }
        
    });
}

const getUserData = (id) => {
    return new Promise((resolve) => {
        db.transaction(function(txn) {
            txn.executeSql(
                `SELECT * FROM user where user_id = ${id}`,
                [],
                (tx, results) => { 
                    console.log("User from database", results);
                    if (results.rows.length > 0) {
                        resolve(results.rows.item(0));
                    } else {
                        resolve(null);
                    }
                }
            )
        });
    })
}

export { createDataBase, checkFirstLogin, saveUserData, getUserData };