<template>
  <v-app>
    <nav-bar @toggleDrawer="toggleDrawer" />
    <v-navigation-drawer app :value="isDrawerOpen">
      <v-list>
        <v-list-item to="/home">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item to="/organisations">
          <v-list-item-icon>
            <v-icon>mdi-domain</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Organisations</v-list-item-title>
        </v-list-item>
        <v-list-item to="/teams">
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Teams</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import NavBar from "@/components/Navbar.vue";

export default {
  name: 'App',
  components: {NavBar},

  data: () => ({
    isDrawerOpen: false,
  }),
  methods: {
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
      console.log(this.isDrawerOpen);
    }
  }
};
</script>

<style scoped>

</style>