<template>
  <div class="page-container">
    <xen-page-toolbar class="xen-theme-indigo" title="Character List"></xen-page-toolbar>
    <div class="xen-page-content xen-page-background">
      <xen-card>
        <!--<xen-card-content>-->
        <xen-list v-if="characters">
          <!--<xen-list-item :text="character.name" v-for="character in characters"></xen-list-item>-->
          <xen-list-item-custom v-for="characterItem in characters"
          @click.native="selectCharacter(characterItem)">
            <xen-checkbox class="character-checkbox xen-color-blue"
            :value="characterItem === character">
            </xen-checkbox>
            <div class="xen-list-item-text-container">
              <span class="item-text">{{ characterItem.name }}</span>
            </div>
          </xen-list-item-custom>
        </xen-list>
        <!--</xen-card-content>-->
      </xen-card>
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
      // characters: undefined
    }
  },

  // Methods
  methods: {
    selectCharacter (character) {
      this.$store.commit('select_character', character)
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
    }
  }
}
</script>

<style scoped lang="scss">
.character-checkbox {
  margin-right: 10px;
}
</style>
