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
 * @property {number} level
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
    try {
        return await getRequest('/heroes/getaliases', {}, 'getAliases');
    } catch (error) {
        return { error: 1, status: 500, data: 'Internal Server Error' };
    }
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
        return { error: 1, status: 400, data: 'missing public name' };
    if (!hero.realName)
        return { error: 1, status: 400, data: 'missing real name' };

    if (hero.powers) {
        for (const power of hero.powers) {
            if (!power.name || !power.type || typeof power.level !== 'number' || power.type < 1 || power.type > 7 || power.level < 0 || power.level > 100) {
                return { error: 1, status: 400, data: 'invalid power details' };
            }
        }
    }

    try {
        return await postRequest('/heroes/create', hero, {}, 'createHero');
    } catch (error) {
        return { error: 1, status: 500, data: 'Internal Server Error' };
    }
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
 * @param {string} secret
 * @returns {Promise<FormattedResponse>}
 */
async function updateHero(hero, secret) {
    if (!hero._id)
        return { error: 1, status: 400, data: 'no id provided' };
    if (!secret)
        return { error: 1, status: 400, data: 'no secret provided' };

    const searchedHero = await getHeroById(hero._id, secret);
    if (searchedHero.error === 1)
        return { error: 1, status: 404, data: 'hero not found' };

    try {
        return await putRequest(`/heroes/update?org-secret=${secret}`, hero, {}, 'updateHero');
    } catch (error) {
        return { error: 1, status: 500, data: 'Internal Server Error' };
    }
}

// GET: /heroes/getbyid/:id
/**
 * Récupère un héros par son id
 * @param {string} id
 * @param {string} secret
 * @returns {Promise<FormattedResponse>}
 */
async function getHeroById(id, secret) {
    if (!id)
        return { error: 1, status: 400, data: 'no id provided' };
    if (!secret)
        return { error: 1, status: 400, data: 'no secret provided' };

    try {
        return await getRequest(`/heroes/getbyid/${id}?org-secret=${secret}`, {}, 'getHeroById');
    } catch (error) {
        return { error: 1, status: 500, data: 'Internal Server Error' };
    }
}

export default {
    getAliases,
    createHero,
    updateHero,
    getHeroById
};
