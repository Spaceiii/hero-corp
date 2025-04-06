<template>
  <v-container v-if="currentTeam">
    <v-row>
      <v-col>
        <h1>{{ currentTeam.name }}</h1>
        <v-btn color="primary" @click="openAddMemberDialog">Ajouter un membre</v-btn>
        <v-list>
          <v-list-item v-for="member in members" :key="member._id">
            <v-list-item-content>
              <v-list-item-title>{{ member.publicName }}</v-list-item-title>
              <v-list-item-subtitle>{{ member.realName }}</v-list-item-subtitle>
              <div v-if="member.powers && member.powers.length">
                <strong>Pouvoirs :</strong>
                <ul>
                  <li v-for="power in member.powers" :key="power.name">
                    {{ power.name }} (Type: {{ power.type }}, Niveau: {{ power.level }})
                  </li>
                </ul>
              </div>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="openEditMemberDialog(member)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="confirmDeleteMember(member._id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <!-- Dialogue pour ajouter un membre -->
    <v-dialog v-model="addMemberDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Ajouter un membre</span>
        </v-card-title>
        <v-card-text>
          <v-select
              v-model="selectedHero"
              :items="availableHeroes"
              item-text="publicName"
              item-value="_id"
              label="Sélectionnez un héros existant ou créez-en un nouveau"
          >
            <template v-slot:append-outer>
              <v-btn text color="primary" @click="openCreateHeroDialog">Créer un nouveau héros</v-btn>
            </template>
          </v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="addMemberDialog = false">Annuler</v-btn>
          <v-btn color="blue darken-1" text @click="addMemberToTeam">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialogue pour créer un nouveau héros -->
    <v-dialog v-model="createHeroDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Créer un nouveau héros</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="newHero.publicName" label="Nom public"></v-text-field>
          <v-text-field v-model="newHero.realName" label="Nom réel"></v-text-field>
          <v-text-field v-model="newPowerName" label="Nom du pouvoir" @keyup.enter="addPower"></v-text-field>
          <v-select v-model="newPowerType" :items="powerTypes" label="Type de pouvoir"></v-select>
          <v-text-field v-model="newPowerLevel" label="Niveau du pouvoir" type="number"></v-text-field>
          <v-btn color="primary" @click="addPower">Ajouter le pouvoir</v-btn>
          <v-list>
            <v-list-item v-for="(power, index) in newHero.powers" :key="index">
              {{ power.name }} (Type: {{ power.type }}, Niveau: {{ power.level }})
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="createHeroDialog = false">Annuler</v-btn>
          <v-btn color="blue darken-1" text @click="createNewHero">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialogue pour modifier un membre -->
    <v-dialog v-model="editMemberDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Modifier un membre</span>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="editedMember.publicName" label="Nom public"></v-text-field>
          <v-text-field v-model="editedMember.realName" label="Nom réel"></v-text-field>
          <v-text-field v-model="editPowerName" label="Nom du pouvoir" @keyup.enter="editPower"></v-text-field>
          <v-select v-model="editPowerType" :items="powerTypes" label="Type de pouvoir"></v-select>
          <v-text-field v-model="editPowerLevel" label="Niveau du pouvoir" type="number"></v-text-field>
          <v-btn color="primary" @click="editPower">Modifier le pouvoir</v-btn>
          <v-list>
            <v-list-item v-for="(power, index) in editedMember.powers" :key="index">
              {{ power.name }} (Type: {{ power.type }}, Niveau: {{ power.level }})
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editMemberDialog = false">Annuler</v-btn>
          <v-btn color="blue darken-1" text @click="saveMemberChanges">Enregistrer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialogue de confirmation de suppression -->
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Confirmer la suppression</span>
        </v-card-title>
        <v-card-text>
          Êtes-vous sûr de vouloir supprimer ce membre de l'équipe ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="deleteDialog = false">Annuler</v-btn>
          <v-btn color="blue darken-1" text @click="removeMemberFromTeam">Confirmer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import HeroService from "@/services/hero.service";

export default {
  name: 'TeamDetail',
  data() {
    return {
      members: [],
      addMemberDialog: false,
      createHeroDialog: false,
      editMemberDialog: false,
      deleteDialog: false,
      selectedHero: null,
      newHero: {
        publicName: '',
        realName: '',
        powers: [],
      },
      newPowerName: '',
      newPowerType: null,
      newPowerLevel: null,
      editedMember: {
        publicName: '',
        realName: '',
        powers: [],
      },
      editPowerName: '',
      editPowerType: null,
      editPowerLevel: null,
      memberToDelete: null,
      powerTypes: [1, 2, 3, 4, 5, 6, 7],
    };
  },
  computed: {
    ...mapState(['currentTeam', 'currentHero', 'heroAliases', 'orgSecret']),
    availableHeroes() {
      return this.heroAliases.filter(hero => !this.members.some(m => m._id === hero._id));
    },
  },
  methods: {
    ...mapActions(['fetchOrgById', 'createHero', 'updateHero', 'addHeroesToTeam', 'removeHeroesFromTeam', 'fetchHeroAliases', 'fetchHeroById']),
    openAddMemberDialog() {
      this.addMemberDialog = true;
    },
    openCreateHeroDialog() {
      this.createHeroDialog = true;
    },
    async addMemberToTeam() {
      if (this.selectedHero) {
        await this.addHeroesToTeam({ teamId: this.currentTeam._id, heroesId: [this.selectedHero] });
        this.addMemberDialog = false;
        this.selectedHero = null;
        console.log(this.members);
      }
    },
    async createNewHero() {
      await this.createHero(this.newHero);
      await this.addHeroesToTeam({ teamId: this.currentTeam._id, heroesId: [this.currentHero._id] });
      this.createHeroDialog = false;
      this.newHero = { publicName: '', realName: '', powers: [] };
    },
    addPower() {
      this.newHero.powers.push({
        name: this.newPowerName,
        type: this.newPowerType,
        level: parseInt(this.newPowerLevel),
      });
      this.newPowerName = '';
      this.newPowerType = null;
      this.newPowerLevel = null;
    },
    openEditMemberDialog(member) {
      this.editedMember = {...member};
      this.editMemberDialog = true;
    },
    editPower() {
      this.editedMember.powers.push({
        name: this.editPowerName,
        type: this.editPowerType,
        level: parseInt(this.editPowerLevel),
      });
      this.editPowerName = '';
      this.editPowerType = null;
      this.editPowerLevel = null;
    },
    async saveMemberChanges() {
      await this.updateHero(this.editedMember);
      this.editMemberDialog = false;
    },
    confirmDeleteMember(memberId) {
      this.memberToDelete = memberId;
      this.deleteDialog = true;
    },
    async removeMemberFromTeam() {
      await this.removeHeroesFromTeam({teamId: this.currentTeam._id, heroesId: [this.memberToDelete]});
      this.deleteDialog = false;
      this.memberToDelete = null;
    },
  },
  async mounted() {
    await this.fetchOrgById(this.$route.params.orgId);
    await this.fetchHeroAliases();
  },

  watch: {
    currentTeam: {
      handler(newVal) {
        if (newVal) {
          this.members = [];
          for (const id of newVal.members) {
            HeroService.getHeroById(id, this.orgSecret).then(response => {
              if (response.error === 0) {
                this.members.push(response.data[0]);
              } else {
                console.error('Error fetching member:', response.data);
              }
            });
          }
        }
      },
      immediate: true,
    },
  }
};
</script>

<style scoped></style>
