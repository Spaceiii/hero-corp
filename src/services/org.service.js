/**
 * @typedef {Object} FormattedResponse
 * @template T
 * @property {number} error
 * @property {number} status
 * @property {T} data
 */

import { getRequest, patchRequest, postRequest } from '@/services/axios.service';

/**
 * Obtenir les IDs des organisations et leurs noms
 * @returns {Promise<FormattedResponse<{_id: string, name: string}[]>>}
 */
async function getOrgs() {
    return await getRequest('/orgs/get', {}, 'getOrgs');
}

/**
 * Créer une organisation
 * @param {string} name
 * @param {string} secret
 * @returns {Promise<FormattedResponse>}
 */
async function createOrg(name, secret) {
    if (!name)
        return { error: 1, status: 400, data: 'missing name' };
    if (!secret)
        return { error: 1, status: 400, data: 'missing secret' };

    return await postRequest('/orgs/create', { name, secret }, {}, 'createOrg');
}

/**
 * Ajouter une équipe à une organisation
 * @param {string} id
 * @param {string} secret
 * @returns {Promise<FormattedResponse>}
 */
async function addTeam(id, secret) {
    if (!id)
        return { error: 1, status: 400, data: 'missing id' };
    if (!secret)
        return { error: 1, status: 400, data: 'missing secret' };

    return await patchRequest(`/orgs/addteam`, { idTeam: id }, {}, 'addTeam');
}

/**
 * Supprimer une équipe d'une organisation
 * @param {string} id
 * @param {string} secret
 * @returns {Promise<FormattedResponse>}
 */
async function removeTeam(id, secret) {
    if (!id)
        return { error: 1, status: 400, data: 'missing id' };
    if (!secret)
        return { error: 1, status: 400, data: 'missing secret' };

    return await patchRequest(`/orgs/removeteam`, { idTeam: id }, {}, 'removeTeam');
}

/**
 * Sélectionner une organisation par son id
 * @param {string} id
 * @param {string} secret
 * @returns {Promise<FormattedResponse>}
 */
async function getOrgById(id, secret) {
    if (!id)
        return { error: 1, status: 400, data: 'missing id' };
    if (!secret)
        return { error: 1, status: 400, data: 'missing secret' };

    return await getRequest(`/orgs/getbyid/${id}`, {}, 'getOrgById');
}

export default {
    getOrgs,
    createOrg,
    addTeam,
    removeTeam,
    getOrgById
};
