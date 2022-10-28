// import sendRequest from './send-request';
const BASE_URL = '/users-api'; // /users-api // //api/users // make sure router uses correct url (inside server.js)

export async function signUp(userData) {
    // Fetch second arg is options when making requests other than basic GET requests, includes data, headers, etc
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        // Fetch needs data payloads to be stringified and assigned to body property on options object
        body: JSON.stringify(userData),
    });
    console.log("res", res);
    // Check if request was successful
    if(res.ok) {
        // res.json() will resolve to JWT
        return res.json();
    } else {
        throw new Error("Invalid Sign Up");
    }
}

export async function login(credentials) {
    // return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
    const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(credentials),
    }).then((res) => {
        return res.json();
    })
    if(res.status === "success") {
        return res;
    } else {throw new Error("Invalid email or password");}
}