/**
 * @typedef {Object} FormattedResponse
 * @template T
 * @property {number} error
 * @property {number} status
 * @property {T} data
 */

/**
 * @typedef {Object} AxiosResponse
 * @template T
 * @property {T} data
 * @property {number} status
 * @property {string} statusText
 * @property {Object} headers
 * @property {axios.AxiosRequestConfig} config
 * @property {Object} request
 */

import axios from "axios";

const axiosAgent = axios.create({
    baseURL: 'https://apidemo.iut-bm.univ-fcomte.fr/herocorp/',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
    // methode de traitement des erreurs, l'API renvoie {error: num_error, status: http_status, data: données}.
    // On renvoie une erreur avec le message de l'API
});

/**
 * post parameters for a post request
 * @template T
 * @param {string} uri
 * @param {T} data
 * @param {axios.AxiosRequestConfig} config
 * @param {string} name
 * @returns {Promise<AxiosResponse | null>}
 */
async function postRequest(uri, data, config = {}, name) {
    /** @type {AxiosResponse | null} */
    let answer = null
    try {
        answer = await axiosAgent.post(uri, data, config)
    } catch (/** @type {axios.AxiosError} */ err) {
        answer = handleError(err, name);
    }
    return answer.data;
}

/**
 * get parameters for a get request
 * @param {string} uri
 * @param {axios.AxiosRequestConfig} config
 * @param {string} name
 * @returns {Promise<AxiosResponse | null>}
 */
async function getRequest(uri, config = {}, name) {
    /** @type {AxiosResponse | null} */
    let answer = null
    try {
        answer = await axiosAgent.get(uri, config)
    } catch (err) {
        answer = handleError(err, name);
    }
    return answer.data;
}

/**
 * put parameters for a put request
 * @template T
 * @param {string} uri
 * @param {T} data
 * @param {axios.AxiosRequestConfig} config
 * @param {string} name
 * @returns {Promise<AxiosResponse | null>}
 */
async function putRequest(uri, data, config = {}, name) {
    let answer = null
    try {
        answer = await axiosAgent.put(uri, data, config)
    } catch (err) {
        answer = handleError(err, name);
    }
    return answer.data;
}

/**
 * delete parameters for a delete request
 * @param {string} uri
 * @param {axios.AxiosRequestConfig} config
 * @param {string} name
 * @returns {Promise<AxiosResponse | null>}
 */
async function deleteRequest(uri, config = {}, name) {
    let answer = null
    try {
        answer = await axiosAgent.delete(uri, config)
    } catch (err) {
        answer = handleError(err, name);
    }
    return answer.data;
}

/**
 * patch parameters for a patch request
 * @template T
 * @param {string} uri
 * @param {T} data
 * @param {axios.AxiosRequestConfig} config
 * @param {string} name
 * @returns {Promise<AxiosResponse | null>}
 */
async function patchRequest(uri, data, config = {}, name) {
    let answer = null
    try {
        answer = await axiosAgent.patch(uri, data, config)
    } catch (err) {
        answer = handleError(err, name);
    }
    return answer.data;
}

/**
 * handle error from api
 * @param {axios.AxiosError} err
 * @param name
 */
function handleError(err, name) {
    let error = err;
    if (err.response && err.response.data) {
        error = err.response.data;
    }
    if (error.error) {
        error.message = `${name} : ${error.error}`;
    }
    throw error;
}

export {
    postRequest,
    getRequest,
    putRequest,
    deleteRequest,
    patchRequest,
    axiosAgent as axios
}