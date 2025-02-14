<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Teams</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="team in teams" :key="team.id">
                <v-list-item-content>
                  <v-list-item-title>{{ team.name }}</v-list-item-title>
                  <v-list-item-subtitle>Nombre d'affiliations: {{ team.nbAffiliations }}</v-list-item-subtitle>
                  <v-list-item-subtitle>_id: {{ team._id }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "TeamsView",
  computed: {
    ...mapState(['teams'])
  },
  methods: {
    ...mapActions(['fetchTeams'])
  },
  async mounted() {
    await this.fetchTeams()
  },
}
</script>

<style scoped>

</style>