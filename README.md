# Promises and async/await lab

Fetching user data from multiple databases.


## Function: getUserData(id)

This function fetches user data from multiple databases. It takes a user ID as an argument and returns a Promise that resolves with the user's data.

The function first calls the `central(id)` function to get the name of the database where the user's data is stored. It then fetches the user's data from the appropriate database and merges it into a user data object.

Next, the function fetches the user's data from the vault and merges it into the user data object.

If an error occurs at any point, it is logged to the console.

## Usage

Here's how you can use the `getUserData` function:

```javascript
getUserData(1)
    .then(data => console.log(data))
    .catch(error => console.error('An error occurred:', error));
```

This code fetches the data for the user with ID 1 and logs it to the console. You can change user id to get the corresponding inforamtion of the user. If an error occurs, it is logged to the console.