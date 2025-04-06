<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Mon Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/auth">S'authentifier</v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item to="/">Accueil</v-list-item>
        <v-list-item to="/organizations">Organisations</v-list-item>
        <v-list-item to="/teams">Équipes</v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: false,
  }),
};
</script>

<style></style>
