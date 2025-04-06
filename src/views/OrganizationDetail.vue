<template>
  <v-container>
    <v-row v-if="currentOrg">
      <v-col>
        <h1>{{ currentOrg.name }}</h1>
        <v-list>
          <v-list-item v-for="team in currentOrg.teams" :key="team._id">
            <v-list-item-content>
              <v-list-item-title>{{ team.name }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="viewTeam(team._id)">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
              <v-btn icon @click="confirmDeleteTeam(team._id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-btn color="primary" @click="openAddTeamDialog">Ajouter une équipe</v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Ajouter une équipe</span>
        </v-card-title>
        <v-card-text>
          <v-select
              v-model="selectedTeam"
              :items="availableTeams"
              item-text="name"
              item-value="_id"
              label="Sélectionnez une équipe"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Annuler</v-btn>
          <v-btn color="blue darken-1" text :disabled="!selectedTeam" @click="addTeamToOrg">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Confirmer la suppression</span>
        </v-card-title>
        <v-card-text>
          Êtes-vous sûr de vouloir supprimer cette équipe ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="deleteDialog = false">Annuler</v-btn>
          <v-btn color="blue darken-1" text @click="removeTeamFromOrg">Confirmer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="errorDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Erreur</span>
        </v-card-title>
        <v-card-text>
          Impossible d'afficher l'organisation. Vérifiez le mot de passe secret.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="goBackToList">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'OrganizationDetail',
  data() {
    return {
      dialog: false,
      deleteDialog: false,
      errorDialog: false,
      selectedTeam: null,
      teamToDelete: null,
    };
  },
  computed: {
    ...mapState(['currentOrg', 'teams', 'orgSecret']),
    availableTeams() {
      return this.teams.filter(team => !this.currentOrg.teams.some(t => t._id === team._id));
    },
  },
  methods: {
    ...mapActions(['fetchOrgById', 'addTeam', 'removeTeam', 'fetchTeams', 'setCurrentTeam']),
    viewTeam(teamId) {
      const team = this.currentOrg.teams.find(t => t._id === teamId);
      console.log("team", team);
      this.setCurrentTeam(team);
      this.$router.push({ name: 'TeamDetail', params: { id: teamId } });
    },
    confirmDeleteTeam(teamId) {
      this.teamToDelete = teamId;
      this.deleteDialog = true;
    },
    async removeTeamFromOrg() {
      await this.removeTeam({id: this.teamToDelete, secret: this.orgSecret});
      await this.fetchOrgById(this.$route.params.id);
      this.deleteDialog = false;
      this.teamToDelete = null;
    },
    openAddTeamDialog() {
      this.dialog = true;
    },
    async addTeamToOrg() {
      await this.addTeam({id: this.selectedTeam, secret: this.orgSecret});
      await this.fetchOrgById(this.$route.params.id);
      console.log('team added', this.selectedTeam);
      console.log(this.currentOrg)
      this.dialog = false;
      this.selectedTeam = null;
    },
    goBackToList() {
      this.errorDialog = false;
      this.$router.push({name: 'OrganizationList'});
    },
  },
  async mounted() {
    try {
      await this.fetchOrgById(this.$route.params.id);
      if (!this.currentOrg) {
        this.errorDialog = true;
      }
      await this.fetchTeams();
    } catch (error) {
      this.errorDialog = true;
    }
  },
};
</script>

<style scoped></style>
