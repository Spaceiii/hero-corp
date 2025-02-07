<template>
  <v-app-bar app color="primary">
    <v-app-bar-nav-icon @click="toggleDrawer" />
    <v-toolbar-title>
      <router-link to="/">Hero Corp</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text to="/login">Login</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    toggleDrawer() {
      this.$emit("toggleDrawer");
    },
  }
}
</script>

<style scoped>
  a {
    color: black;
    text-decoration: none;
  }
</style>