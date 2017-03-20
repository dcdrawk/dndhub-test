<template>
  <div class="page-container">
    <xen-page-toolbar class="xen-theme-indigo" title="Character List"></xen-page-toolbar>

    <div class="xen-page-content xen-page-background">
      <xen-card>
        <div class="xen-table-buttons">
          <xen-button class="xen-theme-blue" :raised="true"
          @click.native="$router.push('/characters/new');">
            New Character
          </xen-button>
        </div>
      </xen-card>
      <div v-if="!characters" class="text-center">
       You don't any characters yet.
      </div>
      <xen-card>
        <xen-list v-if="characters">
          <xen-list-item-custom v-for="(characterItem, index) in characters"
          :key="index" @click.native="selectCharacter(characterItem, index)"
          :class="{'selected': character ? index === character.id : undefined }">
            <xen-checkbox class="character-checkbox xen-color-blue"
            :value="character ? index === character.id : undefined">
            </xen-checkbox>
            <div class="xen-list-item-text-container">
              <span class="item-text">{{ characterItem.name }}</span>
            </div>
            <div class="xen-list-item-right">
              <i class="material-icons delete-icon"
              @click.prevent.stop="showDialog(characterItem, index)">delete</i>
            </div>
          </xen-list-item-custom>
        </xen-list>
        <!--<xen-card-actions class="text-right">
          <xen-button class="xen-theme-primary"
          @click.native="$router.push('/characters/new');"
          :raised="true">
            New Character
          </xen-button>
        </xen-card-actions>-->
      </xen-card>
      <xen-dialog :show="showDeleteDialog"
      :small="true"
      :back="false"
      @hide="hideDialog()"
      title="Delete Character">
        <p v-if="tempCharacter">Are you sure you want to delete {{tempCharacter.name}}?</p>
        <div slot="actions">
          <xen-button @click.native="$bus.$emit('back')">Cancel</xen-button>
          <xen-button class="xen-theme-red" :raised="true"
          @click.native="deleteCharacter(tempCharacterId)">Delete</xen-button>
        </div>
      </xen-dialog>
      <!--{{ character }} {{ tempCharacter }}-->
    </div>
  </div>
</template>

<script>
export default {
  // Name
  name: 'character-list',

  // Data
  data () {
    return {
      showDeleteDialog: false,
      tempCharacter: undefined,
      tempCharacterId: undefined
    }
  },

  // Methods
  methods: {
    showDialog (character, id) {
      this.tempCharacter = character
      this.tempCharacterId = id
      this.showDeleteDialog = true
    },

    hideDialog () {
      this.tempCharacter = undefined
      this.tempCharacterId = undefined
      this.showDeleteDialog = false
    },

    selectCharacter (character, id) {
      character.id = id
      console.log(character)
      this.$bus.$emit('set_character', id)
      // this.$store.commit('set_character', character)
    },

    async deleteCharacter (characterId) {
      try {
        await this.$firebase.database().ref(`characters/${this.user.uid}/${characterId}`).remove()
        if (this.characterId === characterId) {
          this.$store.commit('set_character', undefined)
        }
        this.hideDialog()
      } catch (error) {
        console.error(error)
      }
    }
  },

  // Computed
  computed: {
    user () {
      return this.$store.state.user
    },

    characters () {
      return this.$store.state.characters
    },

    character () {
      return this.$store.state.character
    },

    characterId () {
      return this.$store.state.characterId
    }
  }
}
</script>

<style scoped lang="scss">
.character-checkbox {
  margin-right: 10px;
}
.delete-icon {
  opacity: .5;
}
.selected {
  background-color: #e3f2fd;
}
</style>
