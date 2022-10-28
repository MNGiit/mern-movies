import * as usersAPI from './users-api';

export async function signUp(userData) {
    // Make network request
    const response = await usersAPI.signUp(userData);

    // Get token
    const data = response.data;

    // Add token to localStorage
    localStorage.setItem("data", JSON.stringify(data));

    // Return what the server sent
    return response;
}

export async function login(credentials) {
    // Get token
    console.log('users-service, calling usersAPI.login ...')
    const res = await usersAPI.login(credentials);
    const data = res.data;


    // Apply token to localStorage
    localStorage.setItem('data', JSON.stringify(data));

    return data;
    //return getUser();
}

export const logOut = () => {localStorage.removeItem('data')}; // Method to log the user out

// Function to retrieve JWT from local storage
export const getToken = () => {
    // Get token from localStorage
    const token = JSON.parse(localStorage.getItem("data"))?.token;

    // console.log(token);

    // Return null if token wasn't found
    if(!token) return null;

    // If token was found, continue
    const payload = JSON.parse(atob(token.split(".")[1]));

    // Verify decoded payload is not expired
    if(payload.exp < Number.parseInt(Date.now() / 1000)) {
        // Token is expired so remove and return null
        localStorage.removeItem("data");

        // Return early
        return null;
    }

    // If token didn't expire, return token
    return token;
};

export const getUser = () => {
    const token = getToken();
    return token ? JSON.parse(localStorage.getItem("data")) : null;
};