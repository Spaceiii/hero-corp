<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>Authentification</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submitSecret">
              <v-text-field
                  v-model="secret"
                  label="Entrez la phrase secrète"
                  type="password"
                  required
              ></v-text-field>
              <v-btn type="submit" color="primary">S'authentifier</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AuthView',
  data() {
    return {
      secret: '',
    };
  },
  methods: {
    ...mapActions(['setOrgSecret']),
    submitSecret() {
      if (this.secret.trim() !== '') {
        this.setOrgSecret(this.secret);
        this.secret = ''; // Réinitialiser le champ après soumission
        this.$router.push({ name: 'Home' }); // Rediriger vers la page d'accueil ou une autre page
      }
    },
  },
};
</script>

<style scoped>
/* Ajoutez ici vos styles spécifiques au composant */
</style>
