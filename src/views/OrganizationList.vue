<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
            v-model="search"
            label="Rechercher une organisation"
            append-icon="mdi-magnify"
            single-line
            hide-details
        ></v-text-field>
        <v-data-table
            :headers="headers"
            :items="filteredOrganizations"
            @click:row="viewOrganization"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Liste des Organisations</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="primary" dark @click="openCreateDialog">Nouvelle Organisation</v-btn>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Créer une nouvelle organisation</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="newOrgName" label="Nom de l'organisation"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newOrgSecret" label="Mot de passe secret" type="password"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Annuler</v-btn>
          <v-btn color="blue darken-1" text @click="createOrganization">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'OrganizationList',
  data() {
    return {
      headers: [
        { text: 'ID', value: '_id' },
        { text: 'Nom', value: 'name' },
      ],
      dialog: false,
      newOrgName: '',
      newOrgSecret: '',
      search: '',
    };
  },
  computed: {
    ...mapState(['organizations']),
    filteredOrganizations() {
      return this.organizations.filter(org =>
          org.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    ...mapActions(['fetchOrganizations', 'fetchOrgById', 'createOrg']),
    viewOrganization(organization) {
      this.fetchOrgById(organization._id).then(() => {
        this.$router.push({ name: 'OrganizationDetail', params: { id: organization._id } });
      });
    },
    openCreateDialog() {
      this.dialog = true;
    },
    createOrganization() {
      this.createOrg({ name: this.newOrgName, secret: this.newOrgSecret }).then(() => {
        this.dialog = false;
        this.newOrgName = '';
        this.newOrgSecret = '';
        this.fetchOrganizations();
      });
    },
  },
  mounted() {
    this.fetchOrganizations();
  },
};
</script>

<style scoped></style>
