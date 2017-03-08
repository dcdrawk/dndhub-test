<template>
  <div class="page-container">
    <xen-page-toolbar class="xen-theme-indigo" title="Character List"></xen-page-toolbar>
    <div class="xen-page-content xen-page-background">
      <xen-card>
        <!--<xen-card-content>-->
        <xen-list v-if="characters">
          <xen-list-item :text="character.name" v-for="character in characters"></xen-list-item>
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

  },

  // Computed
  computed: {
    user () {
      return this.$store.state.user
    },

    characters () {
      return this.$store.state.characters
    }
  }
}
</script>

<style scoped lang="scss">
</style>
