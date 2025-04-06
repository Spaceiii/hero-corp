<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
            :headers="headers"
            :items="teams"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Liste des Équipes</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="primary" dark @click="openCreateDialog">Nouvelle Équipe</v-btn>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Créer une nouvelle équipe</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="newTeamName" label="Nom de l'équipe"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Annuler</v-btn>
          <v-btn color="blue darken-1" text @click="createTeamHandler">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'TeamList',
  data() {
    return {
      headers: [
        { text: 'ID', value: '_id' },
        { text: 'Nom', value: 'name' },
      ],
      dialog: false,
      newTeamName: '',
    };
  },
  computed: {
    ...mapState(['teams']),
  },
  methods: {
    ...mapActions(['fetchTeams', 'createTeam']),
    openCreateDialog() {
      this.dialog = true;
    },
    async createTeamHandler() {
      await this.createTeam(this.newTeamName);
      this.dialog = false;
      this.newTeamName = '';
      this.fetchTeams();
    },
  },
  mounted() {
    this.fetchTeams();
  },
};
</script>

<style scoped></style>
