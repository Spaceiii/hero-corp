import Vue from 'vue'
import Vuex from 'vuex'
import HeroService from '@/services/hero.service'
import TeamService from '@/services/team.service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentHero: null,
    currentTeam: null,
    currentOrg: null,
    orgSecret: null,
    heroAliases: [],
    teams: [],
    orgs: [],
  },
  mutations: {
    setCurrentHero(state, hero) {
      state.currentHero = hero;
    },
    setCurrentTeam(state, team) {
      state.currentTeam = team;
    },
    setCurrentOrg(state, org) {
      state.currentOrg = org;
    },
    setOrgSecret(state, secret) {
      state.orgSecret = secret;
    },
    setHeroAliases(state, aliases) {
      state.heroAliases = aliases;
    },
    setTeams(state, teams) {
      state.teams = teams;
    },
    setOrgs(state, orgs) {
      state.orgs = orgs;
    },
  },
  actions: {
    // -------------
    // Hero actions
    // -------------
    async fetchHeroAliases({ commit }) {
      const heroAliases = await HeroService.getAliases();
      if (heroAliases.error === 0) {
        commit('setHeroAliases', heroAliases.data);
      }
    },

    async getHeroById({ commit }, id) {
      const hero = await HeroService.getHeroById(id);
      if (hero.error === 0) {
        commit('setCurrentHero', hero.data);
      }
    },

    // -------------
    // Team actions
    // -------------

    async fetchTeams({ commit }) {
      const teams = await TeamService.getTeams();
      if (teams.error === 0) {
        commit('setTeams', teams.data);
      }
    }
  },
})
