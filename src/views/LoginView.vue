<script>
export default {
  name: "LoginView"
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Email"
                required
              ></v-text-field>
              <v-text-field
                label="Password"
                required
                type="password"
              ></v-text-field>
              <v-btn
                color="primary"
                depressed
                @click="$router.push('/home')"
              >
                Login
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>