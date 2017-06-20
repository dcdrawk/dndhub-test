<template>
  <section class="dndhub-tab-content">
    <xen-card class="margin-bottom" v-if="character">
      <xen-card-content>
        <div class="row xen-color-primary">
          <div class="col-lg-12 col-md-12 col-xs-12">
            <xen-input label="Character Name"
            :debounce="500"
            name="name"
            class="xen-no-margin xen-color-primary"
            :value="character.name"
            @input="$bus.$emit('update_character', {key: 'name', value: $event})">
            </xen-input>
          </div>

          <div class="col-lg-3 col-md-3 col-xs-6">
            <xen-input label="Level"
            :debounce="500"
            name="level"
            type="number"
            class="xen-color-primary"
            :value="character.level"
            @input="$bus.$emit('update_character', {key: 'level', value: $event})">
            </xen-input>
          </div>

          <div class="col-lg-3 col-md-3 col-xs-6">
            <xen-input label="Experience"
            :debounce="500"
            name="experience"
            type="number"
            class="xen-color-primary"
            :value="character.experience"
            @input="$bus.$emit('update_character', {key: 'experience', value: $event})">
            </xen-input>
          </div>

          <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
            <xen-select class="xen-color-primary"
            label="Race"
            :options="races"
            optionKey="name"
            :value="character.race"
            @input="getSubraces($event); $bus.$emit('update_character', {key: 'race', value: $event});">
            </xen-select>
          </div>

          <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
            <xen-select class="xen-color-primary xen-no-margin"
            label="Subrace"
            :options="subraces"
            optionKey="name"
            :value="character.subrace"
            @input="$bus.$emit('update_character', {key: 'subrace', value: $event});">
            </xen-select>
          </div>
        </div>
      </xen-card-content>
    </xen-card>
  </section>
</template>

<script>
export default {
  // Name
  name: 'character-tab',

  // Data
  data () {
    return {
      subraces: undefined
    }
  },

  // Methods
  methods: {
    // Get the list of subraces from a race
    getSubraces (raceName) {
      if (this.races) {
        if (raceName !== this.character.race) {
          this.$set(this.character, 'subrace', undefined)
          this.$bus.$emit('update_character', {key: 'subrace', value: null})
        }
        this.races.forEach((race, index) => {
          if (race.name === raceName) {
            this.subraces = race.subraces
            return
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

    races () {
      return this.$store.state.gameData.races
    }
  },

  // Watch
  watch: {
    character (value) {
      if (value) {
        this.getSubraces(value.race)
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
