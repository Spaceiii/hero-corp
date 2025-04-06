import Vue from 'vue';
import Vuex from 'vuex';
import TeamService from '@/services/team.service';
import OrgService from '@/services/org.service';
import HeroService from '@/services/hero.service';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // heroes
    heroAliases: [],
    currentHero: null,

    // teams
    teams: [],
    currentTeam: null,

    // organizations
    orgSecret: null,
    organizations: [],
    currentOrg: null,
  },
  mutations: {
    set_org_secret(state, secret) {
      state.orgSecret = secret;
    },
    set_hero_aliases(state, aliases) {
      state.heroAliases = aliases;
    },
    set_current_hero(state, hero) {
      state.currentHero = hero;
    },
    set_teams(state, teams) {
      state.teams = teams;
    },
    set_current_team(state, team) {
      state.currentTeam = team;
    },
    set_organizations(state, organizations) {
      state.organizations = organizations;
    },
    set_current_org(state, org) {
      state.currentOrg = org;
    },
  },
  actions: {
    async fetchHeroAliases({ commit }) {
      const response = await HeroService.getAliases();
      if (response.error === 0) {
        commit('set_hero_aliases', response.data);
      }
    },
    async fetchHeroById({ commit, state }, id) {
      const response = await HeroService.getHeroById(id, state.orgSecret);
      if (response.error === 0) {
        commit('set_current_hero', response.data);
      }
    },
    async updateCurrentHero({ commit, state }, hero) {
      const response = await HeroService.updateHero(hero, state.orgSecret);
      if (response.error === 0) {
        commit('set_current_hero', response.data);
      }
    },
    async fetchTeams({ commit }) {
      const response = await TeamService.getTeams();
      if (response.error === 0) {
        console.log("teams :", response.data);
        commit('set_teams', response.data);
      }
    },
    async createTeam({ commit }, teamName) {
      const response = await TeamService.createTeam(teamName);
      if (response.error === 0) {
        commit('set_current_team', response.data);
      }
    },
    async addTeam({ commit }, { id, secret }) {
      const response = await OrgService.addTeam(id, secret);
      console.log("response :", response);
      console.log("secret", secret);
      if (response.error === 0) {
        commit('set_current_team', response.data);
      }
    },
    async removeTeam({ commit }, { id, secret }) {
      const response = await OrgService.removeTeam(id, secret);
      if (response.error === 0) {
        commit('set_current_team', response.data);
      }
    },
    async fetchOrganizations({ commit }) {
      const response = await OrgService.getOrgs();
      if (response.error === 0) {
        commit('set_organizations', response.data);
      }
    },
    async fetchOrgById({ commit, state }, id) {
      const response = await OrgService.getOrgById(id, state.orgSecret);
      if (response.error === 0) {
        commit('set_current_org', response.data[0]);
      }
    },
    async createOrg({ commit }, { name, secret }) {
      const response = await OrgService.createOrg(name, secret);
      if (response.error === 0) {
        commit('set_current_org', response.data);
      }
    },
    setOrgSecret({ commit }, secret) {
      commit('set_org_secret', secret);
    },
    async setCurrentTeam({ commit }, team) {
      if (!team) {
        console.error('Team is null or undefined');
        return;
      }
      console.log("setCurrentTeam :", team);
      commit('set_current_team', team);
    },
    async createHero({ commit }, hero) {
      const response = await HeroService.createHero(hero);
      if (response.error === 0) {
        commit('set_current_hero', response.data);
      }
    },
    async addHeroesToTeam({ commit }, { teamId, heroesId }) {
      const response = await TeamService.addHeroesToTeam(teamId, heroesId);
      if (response.error === 0) {
        commit('set_current_team', response.data);
      }
    },
    async removeHeroesFromTeam({ commit }, { teamId, heroesId }) {
      const response = await TeamService.removeHeroesFromTeam(teamId, heroesId);
      if (response.error === 0) {
        commit('set_current_team', response.data);
      }
    },
    async updateHero({ commit }, { hero, secret }) {
      const response = await HeroService.updateHero(hero, secret);
      if (response.error === 0) {
        commit('set_current_hero', response.data);
      }
    },
    async getHeroById({ commit }, { id, secret }) {
      const response = await HeroService.getHeroById(id, secret);
      if (response.error === 0) {
        commit('set_current_hero', response.data);
      }
    }
  },
});
