<template>
  <section class="dndhub-tab-content" v-if="character">

    <xen-card>
      <xen-card-header>
        <h2 class="title">
          {{character.classPrimary}}<span v-if="character.archetypePrimary">, {{character.archetypePrimary}}</span>
        </h2>
      </xen-card-header>
      <xen-card-content v-if="primaryInfo">
        <div class="dnd-proficiency" v-for="proficiency in primaryInfo.proficiencies">
          <h3 class="subheading"><strong>{{ proficiency.title }}</strong></h3>
          <p>{{ proficiency.description }}</p>
        </div>
      </xen-card-content>
    </xen-card>

    <xen-card v-if="character.enableSecondaryClass">
      <xen-card-header>
        <h2 class="title">
          {{character.classSecondary}}<span v-if="character.archetypeSecondary">, {{character.archetypeSecondary}}</span>
        </h2>
      </xen-card-header>
      <xen-card-content v-if="primaryInfo">
        <div class="dnd-proficiency" v-for="proficiency in secondaryInfo.proficiencies">
          <h3 class="subheading"><strong>{{ proficiency.title }}</strong></h3>
          <p>{{ proficiency.description }}</p>
        </div>
      </xen-card-content>
    </xen-card>

  </section>
</template>

<script>
export default {
  // Name
  name: 'proficiency-tab',

  // Data
  data () {
    return {
      primaryInfo: undefined,
      secondaryInfo: undefined
    }
  },

  mounted () {
    if (this.character) {
      if (this.character.classPrimary) {
        this.getPrimaryInfo(this.character.classPrimary)
      }
      if (this.character.enableSecondaryClass && this.character.classSecondary) {
        this.getSecondaryInfo(this.character.classSecondary)
      }
    }
  },

  // Methods
  methods: {
    // Get the list of class archetypes
    getPrimaryInfo () {
      console.log(this.classPrimary)
      if (this.classes) {
        this.classes.forEach((classObj, index) => {
          if (classObj.name === this.classPrimary) {
            this.primaryInfo = classObj
            this.primaryArchetypes = classObj.specializations
          }
        })
      }
    },

    getSecondaryInfo () {
      if (this.classes) {
        this.classes.forEach((classObj, index) => {
          if (classObj.name === this.classSecondary) {
            this.secondaryInfo = classObj
          }
        })
      }
    }
  },

  // Computed
  computed: {

    character () {
      return this.$store.state.character
    },

    classPrimary () {
      if (this.$store.state.character) {
        return this.$store.state.character.classPrimary
      }
    },

    classSecondary () {
      if (this.$store.state.character) {
        return this.$store.state.character.classSecondary
      }
    },

    classes () {
      if (this.$store.state.character) {
        return this.$store.state.gameData.classes
      }
    }
  },

  // Watch
  watch: {
    classPrimary (value) {
      console.log('primary')
      if (value) {
        this.getPrimaryInfo(value)
      }
    },

    classSecondary (value) {
      if (value) {
        this.getSecondaryInfo(value)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.dnd-proficiency {
  padding: 16px 0;
  border-bottom: 1px solid #eee;
  &:first-child {
    padding-top: 0;
  }
}
</style>
