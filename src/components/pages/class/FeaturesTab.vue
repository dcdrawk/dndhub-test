<template>
  <section class="dndhub-tab-content">
    <xen-card v-if="character">
      <xen-card-content>
        <!--Sort Select-->
        <xen-select
        class="xen-no-margin xen-color-primary"
        :value="character.classFeatSort || 'All'"
        @input="$bus.$emit('update_character', { key: 'classFeatSort', value: $event });"
        :options="['All', 'Known']">

        </xen-select>
      </xen-card-content>
    </xen-card>

    <xen-card v-if="character">
      <xen-card-header>
        <h2 class="title">
          {{character.classPrimary}}, {{character.archetypePrimary}} - Level {{primaryLevel}}
        </h2>
      </xen-card-header>
      <xen-list v-if="filteredPrimary"  :dense="true">
        <xen-list-item v-for="(feature, index) in filteredPrimary" :key="index"
        :text="feature.title" :secondary-text="`Level ${feature.level}`"
        @click.native="selectFeat(feature)">
        </xen-list-item>
      </xen-list>
    </xen-card>

    <xen-card v-if="character ? character.enableSecondaryClass : false">
      <xen-card-header>
        <h2 class="title">
          {{character.classSecondary}}, {{character.archetypeSecondary}} - Level {{secondaryLevel}}
        </h2>
      </xen-card-header>
      <xen-list v-if="filteredSecondary" :dense="true">
        <xen-list-item v-for="(feature, index) in filteredSecondary" :key="index"
        :text="feature.title" :secondary-text="`Level ${feature.level}`"
        @click.native="selectFeat(feature)">
        </xen-list-item>
      </xen-list>
    </xen-card>

    <!-- Class Feature Dialog -->
    <div v-if="selectedFeat">
      <xen-dialog :show="showFeat" @hide="showFeat = false"
      :title="selectedFeat.title"
      :large="true"
      :back="true"
      :fullscreen="true"
      :primary="true">
        <div class="row">
          <div v-html="selectedFeat.description"></div>
          <div v-if="selectedFeat.options">
            <div class="option" v-for="option in selectedFeat.options">
              <h3 class="option-title">{{option.title}}</h3>
              <p>{{option.description}}</p>
            </div>
          </div>
        </div>
        <div slot="actions">
          <xen-button @click.native="$bus.$emit('back')" class="xen-color-primary">Close</xen-button>
        </div>
      </xen-dialog>
    </div>

  </section>
</template>

<script>
export default {
  // Name
  name: 'feature-tab',

  // Data
  data () {
    return {
      abilities: undefined,
      primaryFeatures: [],
      secondaryFeatures: [],
      selectedFeat: undefined,
      showFeat: false
    }
  },

  mounted () {
    if (this.character) {
      if (this.character.classPrimary) {
        this.getPrimaryFeatures(this.character.classPrimary)
      }
      if (this.character.enableSecondaryClass && this.character.classSecondary) {
        this.getSecondaryFeatures(this.character.classSecondary)
      }
    }
  },

  // Methods
  methods: {
    // Get the list of class archetypes
    getPrimaryFeatures (className) {
      this.primaryFeatures = []
      if (this.classFeatures) {
        this.classFeatures.forEach((feature) => {
          if (feature.class === this.character.classPrimary &&
          feature.archetype === 'None' ||
          feature.class === this.character.classPrimary &&
          feature.archetype === this.character.archetypePrimary) {
            this.primaryFeatures = this.primaryFeatures.concat(feature.abilities)
          }
        })
      }
    },

    // Get the list of class archetypes
    getSecondaryFeatures (className) {
      this.secondaryFeatures = []
      if (this.classFeatures) {
        this.classFeatures.forEach((feature) => {
          if (feature.class === this.character.classSecondary &&
          feature.archetype === 'None' ||
          feature.class === this.character.classSecondary &&
          feature.archetype === this.character.archetypeSecondary) {
            this.secondaryFeatures = this.secondaryFeatures.concat(feature.abilities)
          }
        })
      }
    },

    selectFeat (feat) {
      this.selectedFeat = feat
      this.$nextTick(() => {
        this.showFeat = true
      })
    }
  },

  // Computed
  computed: {
    primaryLevel () {
      if (this.character) {
        if (this.character.enableSecondaryClass === true) {
          return this.character.levelPrimary || 1
        } else {
          return this.character.level || 1
        }
      }
    },

    secondaryLevel () {
      if (this.character) {
        if (this.character.enableSecondaryClass === true) {
          return this.character.levelSecondary || 1
        } else {
          return this.character.level || 1
        }
      }
    },
    // features () {
    //   let features
    //   if (this.primaryFeatures) {
    //     features = this.primaryFeatures
    //   }
    //   return features
    // },

    filteredPrimary () {
      return this.primaryFeatures.filter((feat) => {
        if (this.character.classFeatSort === 'All') {
          return true
        } else if (this.character.classFeatSort === 'Known') {
          return +feat.level <= +this.character.level
        }
      }).sort((a, b) => {
        return +a.level - +b.level
      })
    },

    filteredSecondary () {
      return this.secondaryFeatures.filter((feat) => {
        if (this.character.classFeatSort === 'All') {
          return true
        } else if (this.character.classFeatSort === 'Known') {
          return +feat.level <= +this.character.level
        }
      }).sort((a, b) => {
        return +a.level - +b.level
      })
    },

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

    archetypePrimary () {
      if (this.$store.state.character) {
        return this.$store.state.character.archetypePrimary
      }
    },

    archetypeSecondary () {
      if (this.$store.state.character) {
        return this.$store.state.character.archetypeSecondary
      }
    },

    classes () {
      return this.$store.state.gameData.classes
    },

    classFeatures () {
      return this.$store.state.gameData.classFeatures
    }
  },

  // Watch
  watch: {
    classPrimary (value) {
      if (value) {
        this.getPrimaryFeatures(value)
      }
    },

    classSecondary (value) {
      if (value) {
        this.getSecondaryFeatures(value)
      }
    },

    archetypePrimary (value) {
      if (value) {
        this.getPrimaryFeatures(value)
      }
    },

    archetypeSecondary (value) {
      if (value) {
        this.getSecondaryFeatures(value)
      }
    }
  }
}
</script>

<style scoped lang="scss">
$border-color: #9e9e9e;
.option {
  padding: 8px;
  border-top: 1px solid $border-color;
  border-right: 1px solid $border-color;
  border-left: 1px solid $border-color;
  border-collapse: collapse;
  background-color: #e3f2fd;
  &:last-child {
    border-bottom: 1px solid $border-color;
  }
  p {
    margin: 0;
  }
}
</style>
