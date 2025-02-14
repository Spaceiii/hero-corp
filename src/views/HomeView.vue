<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Home</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="heroAlias in heroAliases" :key="heroAlias.id">
                <v-list-item-content>
                  <v-list-item-title>Nom public : {{ heroAlias.publicName }}</v-list-item-title>
                  <v-list-item-subtitle>{{ heroAlias._id }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- current hero   -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Current Hero</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Nom public : {{ heroAliases[0].publicName }}</v-list-item-title>
                  <v-list-item-subtitle>{{ heroAliases[0]._id }}</v-list-item-subtitle>
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
import {mapActions, mapMutations, mapState} from "vuex";

  export default {
    name: 'HomeView',
    computed: {
      ...mapState(['heroAliases'])
    },
    methods: {
      ...mapMutations(['setCurrentHero']),
      ...mapActions(['fetchHeroAliases', 'getHeroById'])
    },
    async mounted() {
      await this.fetchHeroAliases()
      this.setCurrentHero(await this.setCurrentHero('67acd39b07a3f4ae9f6afe38'))
    }
  }
</script>
