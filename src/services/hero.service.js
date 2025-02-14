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

import { getRequest, postRequest, putRequest } from '@/services/axios.service';

// GET : /heroes/getaliases
/**
 * Récupère la liste des alias de tous les héros
 * @returns {Promise<FormattedResponse<{
 *     _id: string,
 *     publicName: string
 * }>>}
 */
async function getAliases() {
    return await getRequest('/heroes/getaliases', {}, 'getAliases');
}

// POST : /heroes/create
/**
 * Crée un héros
 * @param {{
 *     publicName: string,
 *     realName: string,
 *     powers: Power[] | undefined
 * }} hero
 * @returns {Promise<FormattedResponse>}
 */
async function createHero(hero) {
    if (!hero.publicName)
        return { error: 1, status: 400, data: 'missing public name' }
    if (!hero.realName)
        return { error: 1, status: 400, data: 'missing real name' }
    return await postRequest('/heroes/create', hero, {}, 'createHero');
}

// PUT : /heroes/update
/**
 * Met à jour un héros
 * @param {{
 *   _id: string,
 *   publicName: string | undefined,
 *   realName: string | undefined,
 *   powers: Power[] | undefined
 * }} hero
 * @param {secret} secret
 * @returns {Promise<FormattedResponse>}
 */
async function updateHero(hero, secret) {
    if (!hero._id)
        return { error: 1, status: 400, data: 'no id provided' }
    if (!secret)
        return { error: 1, status: 400, data: 'no secret provided' }
    const searchedHero = await getHeroById(hero._id);
    if (!searchedHero.error === 1)
        return { error: 1, status: 404, data: 'hero not found' }
    return await putRequest(`/heroes/update?org-secret=${secret}`, hero, {}, 'updateHero');
}

// GET: /heroes/getbyid/:id
/**
 * Récupère un héros par son id
 * @param {string} id
 * @returns {Promise<FormattedResponse>}
 */
async function getHeroById(id) {
    if (!id)
        return { error: 1, status: 400, data: 'no id provided' }
    return await getRequest(`/heroes/getbyid/${id}`, {}, 'getHeroById');
}

export default {
    getAliases,
    createHero,
    updateHero,
    getHeroById
}