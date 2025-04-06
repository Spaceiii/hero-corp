<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <v-text-field
            v-model="secret"
            label="Entrez la phrase secrète"
            type="password"
            @keyup.enter="submitSecret"
        ></v-text-field>
        <v-btn color="primary" @click="submitSecret">Soumettre</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SecretInput',
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
        this.secret = '';
      }
    },
  },
};
</script>

<style scoped></style>
