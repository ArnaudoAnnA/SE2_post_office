const APIURL = 'http://localhost:3000/API/';

/**
 * Generic API call
 *
 * @param endpoint API endpoint string to fetch
 * @param method HTTP method
 * @param body HTTP request body string
 * @param headers additional HTTP headers to be passed to 'fetch'
 * @param expectResponse wheter to expect a non-empty response body
 * 
 * @returns whatever the specified API endpoint returns
 */
const APICall = async (endpoint, method = "GET", body = undefined, headers = undefined, expectResponse = true) => {
    let errors = [];

    try {
        const response = await fetch(new URL(endpoint, APIURL), {
            method,
            body,
            headers
        });
        if (response.ok) {
            if (expectResponse) return await response.json();
        }
        else errors = (await response.json()).errors;
    } catch {
        const err = ["Failed to contact the server"];
        throw err;
    }

    if (errors.length !== 0)
        throw errors;
};

/**
 * Send a request to the server to get in line
 */

const queues = async (service) => await APICall(
    "queues",
    "POST",
    JSON.stringify({ service }),
    { "Content-Type": "application/json" },
    false
);

const API = {
    queues
};

export { API };