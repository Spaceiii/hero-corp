/**
 * @typedef {Object} FormattedResponse
 * @template T
 * @property {number} error
 * @property {number} status
 * @property {T} data
 */

import { getRequest, postRequest, patchRequest } from "@/services/axios.service";

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
        return { error: 1, status: 400, data: 'missing team name' };

    const response = await postRequest('/teams/create', { name: teamName }, {}, 'createTeam');
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
    if (!teamId || !heroesId.length)
        return { error: 1, status: 400, data: 'missing team id or heroes ids' };

    return await patchRequest('/teams/addheroes', {
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
    if (!teamId || !heroesId.length)
        return { error: 1, status: 400, data: 'missing team id or heroes ids' };

    return await patchRequest('/teams/removeheroes', {
        idTeam: teamId,
        idHeroes: heroesId
    }, {}, 'removeHeroesFromTeam');
}

export default {
    getTeams,
    createTeam,
    addHeroesToTeam,
    removeHeroesFromTeam,
};
