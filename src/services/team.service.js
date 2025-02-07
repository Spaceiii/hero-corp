import { getRequest, postRequest } from "@/services/axios.service";

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

// GET : /teams/get
/**
 * Récupère la liste des équipes
 * @returns {Promise<FormattedResponse>}
 */
async function getTeams() {
    return await getRequest('/teams/get', {}, 'getTeams');
}

// POST : /teams/create
/**
 * Crée une équipe
 * @param {string} teamName
 * @returns {Promise<FormattedResponse>}
 */
async function createTeam(teamName) {
    if (!teamName)
        return { error: 1, status: 400, data: 'missing team name' }
    const response = await postRequest('/teams/create', teamName, {}, 'createTeam');
    return { error: 0, status: response.status, data: response.data };
}

// PATCH : /teams/addheroes
/**
 * Ajoute des héros à une équipe
 * @param {string} teamId
 * @param {string[]} heroesId
 * @returns {Promise<FormattedResponse>}
 */
async function addHeroesToTeam(teamId, heroesId) {
    return await postRequest('/teams/addheroes/', {
        idTeam: teamId,
        idHeroes: heroesId
    }, {}, 'addHeroesToTeam');
}

// PATCH : /teams/removeheroes
/**
 * Retire des héros d'une équipe
 * @param {string} teamId
 * @param {string[]} heroesId
 * @returns {Promise<FormattedResponse>}
 */
async function removeHeroesFromTeam(teamId, heroesId) {
    if(!heroesId.length)
        return { error: 1, status: 400, data: 'missing heroes ids' }
    if (!teamId)
        return { error: 1, status: 400, data: 'missing team id' }

    return await postRequest(`/teams/removeheroes/`, {
        idTeam: teamId,
        idHeroes: heroesId
    }, {}, 'removeHeroesFromTeam');
}

export {
    getTeams,
    createTeam,
    addHeroesToTeam,
    removeHeroesFromTeam,
}