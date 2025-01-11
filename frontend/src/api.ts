const API_BASE_URL = import.meta.env.VITE_BASE_API_URL

interface requestPropsInterface {
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    payload: object | null
    customHeaders: object | null,
    customErrorMessage: string | null,
    errorCleanup?: () => void
}

const defaultHeaders = {
    'Content-Type': 'application/json',
};

const request = async ({method, url, payload, customHeaders, customErrorMessage, errorCleanup}: requestPropsInterface) => {
    const headers = { ...defaultHeaders, ...customHeaders };
    let body;

    if (payload) {
        body = JSON.stringify(payload);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${url}`, {
        method,
        headers,
        body,
        });

        const data = await response.json();

        if (!response.ok) {
            if (errorCleanup) errorCleanup();
            throw { status: response.status, data };
        }

        return data;

    } catch (error) {
        console.error(`Something went wrong with ${url}:`, error);
        if (customErrorMessage) console.error("Error: ", customErrorMessage)
        throw error;
    }
};

const get = ({url, customHeaders, customErrorMessage, errorCleanup}: Pick<requestPropsInterface, Exclude<keyof requestPropsInterface, 'method' | "payload">>) => request({
    method: 'GET', 
    url: url,
    payload: null,
    customHeaders,
    customErrorMessage, 
    errorCleanup
});
const post = ({url, payload, customHeaders, customErrorMessage, errorCleanup}: Pick<requestPropsInterface, Exclude<keyof requestPropsInterface, 'method'>>) => request({
    method: 'POST', 
    url: url, 
    payload: payload, 
    customHeaders,
    customErrorMessage, 
    errorCleanup
});
const put = ({url, payload, customHeaders, customErrorMessage, errorCleanup}: Pick<requestPropsInterface, Exclude<keyof requestPropsInterface, 'method'>>) => request({
    method: 'PUT', 
    url: url, 
    payload: payload, 
    customHeaders,
    customErrorMessage, 
    errorCleanup
});
const del = ({url, customHeaders, customErrorMessage, errorCleanup}: Pick<requestPropsInterface, Exclude<keyof requestPropsInterface, 'method'>>) => request({
    method: 'DELETE', 
    url: url,
    payload: null,
    customHeaders,
    customErrorMessage,
    errorCleanup
});

export { get, post, put, del };
