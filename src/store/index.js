import Vue from 'vue'
import Vuex from 'vuex'

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
  },
})
