// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

function getUserData(id) {
    const dbs = {
        db1: db1,
        db2: db2,
        db3: db3,
    };
    // try{
    // let waiting = await dbs.db1(id);
    // console.log(waiting);
    // }catch{
    // }
    console.log(dbs.db1(id));
    // Promise.any([dbs.db1(id), dbs.db2(id), dbs.db3(id)])
    //   .then((x) => {
    //     console.log(x);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    Promise.resolve(dbs.db1(id))
        .then((x) => {
            console.log(x);
        })
        .catch((err) => {
            console.log(err);
        });
}


// Part 2

function getUserData1(id) {
    // Initialize the user data object with the id
    let userData = { id: id };

    // Start the chain of promises
    let promiseChain = central(id)
        .then(dbName => {
            // Map of database names to their corresponding functions
            const databaseFunctions = { db1, db2, db3 };

            // Get the function that fetches data from the appropriate database
            const fetchFromDatabase = databaseFunctions[dbName];

            // Fetch the user's data from the database
            return fetchFromDatabase(id);
        })
        .then(dbData => {
            // Merge the database data into the user data object
            Object.assign(userData, dbData);

            // Fetch the user's data from the vault
            return vault(id);
        })
        .then(vaultData => {
            // Merge the vault data into the user data object
            Object.assign(userData, vaultData);

            // Return the complete user data
            return userData;
        })
        .catch(error => {
            console.error('An error occurred:', error);
        });

    return promiseChain;
}

getUserData1(1)
    .then(data => console.log(data))
    .catch(error => console.error('An error occurred:', error));