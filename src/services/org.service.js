/**
 * @typedef {Object} FormattedResponse
 * @template T
 * @property {number} error
 * @property {number} status
 * @property {T} data
 */

/**
 * @typedef {Object} Power
 * @property {string} name
 * @property {string} type
 * @property {int} level
 */

import {getRequest, patchRequest, postRequest} from '@/services/axios.service';

/**
 * Obtenir les IDs des organisations et leurs noms
 * @returns {Promise<FormattedResponse<{_id: string, name: string}[]>>}
 */
async function getOrgs() {
    return await getRequest('/orgs/get', {}, 'getOrgs')
}

/**
 * Créer une organisation
 * @param {string} name
 * @param {string} secret
 * @returns {Promise<FormattedResponse>}
 */
async function createOrg(name, secret) {
    if (!name)
        return { error: 1, status: 400, data: 'missing name' }
    if (!secret)
        return { error: 1, status: 400, data: 'missing secret' }
    return await postRequest(
        '/orgs/create',
        { name, secret },
        {},
        'createOrg');
}

/**
 * Ajouter une équipe à une organisation
 * @param {string} id
 * @param {string} secret
 * @returns {Promise<FormattedResponse>}
 */
async function addTeam(id, secret) {
    if (!id)
        return {error: 1, status: 400, data: 'missing id'}
    if (!secret)
        return {error: 1, status: 400, data: 'missing secret'}
    return await patchRequest(
        `/orgs/addteam?org-secret=${secret}`,
        {idTeam: id},
        {},
        'addTeam');
}

/**
 * Supprimer une équipe d'une organisation
 * @param {string} id
 * @param {string} secret
 * @returns {Promise<FormattedResponse>}
 */
async function removeTeam(id, secret) {
    if (!id)
        return { error: 1, status: 400, data: 'missing id' }
    if (!secret)
        return { error: 1, status: 400, data: 'missing secret' }
    return await patchRequest(
        `/orgs/removeteam?org-secret=${secret}`,
        { idTeam: id },
        {},
        'deleteOrg');
}

/**
 * Sélectionner une organisation par son id
 * @param {string} id
 * @param {string} secret
 * @returns {Promise<FormattedResponse>}
 */
async function getTeamById(id, secret) {
    if (!id)
        return { error: 1, status: 400, data: 'missing id' }
    return await getRequest(
        `/orgs/getbyid/${id}?org-secret=${secret}`,
        {},
        'selectOrg');
}

export {
    getOrgs,
    createOrg,
    addTeam,
    removeTeam,
    getTeamById
}