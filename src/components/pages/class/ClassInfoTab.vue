<template>
  <section class="dndhub-tab-content">
    <xen-card class="margin-bottom" v-if="character">
      <xen-card-header>
        <h2 class="title">Primary Class</h2>
      </xen-card-header>
      <xen-card-content>
        <div class="row xen-color-primary">
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <xen-select class="xen-color-primary"
            label="Class"
            :options="classes"
            optionKey="name"
            :value="character.classPrimary"
            @input="getPrimaryArchetypes($event); $bus.$emit('update_character',
            {key: 'classPrimary', value: $event});">
            </xen-select>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <xen-select class="xen-color-primary"
            label="Archetype"
            :options="primaryArchetypes"
            optionKey="title"
            :value="character.archetypePrimary"
            @input="$bus.$emit('update_character',
            {key: 'archetypePrimary', value: $event});">
            </xen-select>
          </div>
          <div v-if="character.enableSecondaryClass" class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <xen-input label="Class Level"
            type="number"
            :debounce="500"
            name="name"
            class="xen-no-margin xen-color-primary"
            :value="character.levelPrimary"
            @input="$bus.$emit('update_character',
            {key: 'levelPrimary', value: $event});">
            </xen-input>
          </div>
          <div class="col-xs-12"
          :class="{
            'col-sm-12 col-md-12 col-lg-12': !character.enableSecondaryClass,
            'col-sm-6 col-md-6 col-lg-6': character.enableSecondaryClass
          }">
            <xen-input  v-if="primaryInfo" label="Hit Dice"
            :debounce="500"
            name="name"
            class="xen-no-margin xen-color-primary"
            :disabled="true"
            :value="primaryInfo.hitDice">
            </xen-input>
          </div>
        </div>
        <div>
          <div>
            <xen-checkbox class="xen-color-primary"
            @click.native="$bus.$emit('update_character',
            {key: 'enableSecondaryClass', value: !character.enableSecondaryClass})"
            :value="character.enableSecondaryClass">
            </xen-checkbox>
            <span @click="$bus.$emit('update_character',
            {key: 'enableSecondaryClass', value: !character.enableSecondaryClass})">
              Enable Secondary Class
            </span>
          </div>
        </div>
      </xen-card-content>
    </xen-card>

    <xen-card class="margin-bottom" v-if="character ? character.enableSecondaryClass : false ">
      <xen-card-header>
        <h2 class="title">Secondary Class</h2>
      </xen-card-header>
      <xen-card-content>
        <div class="row xen-color-primary">
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <xen-select class="xen-color-primary"
            label="Class"
            :options="classes"
            optionKey="name"
            :value="character.classSecondary"
            @input="getSecondaryArchetypes($event); $bus.$emit('update_character',
            {key: 'classSecondary', value: $event});">
            </xen-select>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <xen-select class="xen-color-primary"
            label="Archetype"
            :options="secondaryArchetypes"
            optionKey="title"
            :value="character.archetypeSecondary"
            @input="$bus.$emit('update_character',
            {key: 'archetypeSecondary', value: $event});">
            </xen-select>
          </div>
          <div v-if="character.enableSecondaryClass"
          class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <xen-input label="Class Level"
            type="number"
            :debounce="500"
            name="name"
            class="xen-no-margin xen-color-primary"
            :value="character.levelSecondary"
            @input="$bus.$emit('update_character',
            {key: 'levelSecondary', value: $event});">
            </xen-input>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" v-if="secondaryInfo">
            <xen-input label="Hit Dice"
            :debounce="500"
            name="name"
            class="xen-no-margin xen-color-primary"
            :disabled="true"
            :value="secondaryInfo.hitDice">
            </xen-input>
          </div>
        </div>
      </xen-card-content>
    </xen-card>
  </section>
</template>

<script>
export default {
  // Name
  name: 'class-info-tab',

  // Data
  data () {
    return {
      primaryArchetypes: undefined,
      secondaryArchetypes: undefined,
      primaryInfo: undefined,
      secondaryInfo: undefined
    }
  },

  mounted () {
    if (this.character) {
      if (this.character.classPrimary) {
        this.getPrimaryArchetypes(this.character.classPrimary)
      }
      if (this.character.classSecondary) {
        this.getSecondaryArchetypes(this.character.classSecondary)
      }
    }
  },

  // Methods
  methods: {
    // Get the list of class archetypes
    getPrimaryArchetypes (className) {
      if (this.classes) {
        if (className !== this.character.classPrimary) {
          console.log(className, this.character.class)
          // this.$set(this.character, 'archetype', undefined)
          this.$bus.$emit('update_character', {key: 'archetypePrimary', value: null})
        }
        this.classes.forEach((classObj, index) => {
          if (classObj.name === className) {
            this.primaryInfo = classObj
            this.primaryArchetypes = classObj.specializations
            return
          }
        })
      }
    },

    getSecondaryArchetypes (className) {
      if (this.classes) {
        if (className !== this.character.classSecondary) {
          // this.$set(this.character, 'archetypeSecondary', undefined)
          this.$bus.$emit('update_character', {key: 'archetypeSecondary', value: null})
        }
        this.classes.forEach((classObj, index) => {
          if (classObj.name === className) {
            this.secondaryInfo = classObj
            this.secondaryArchetypes = classObj.specializations
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

    classes () {
      return this.$store.state.gameData.classes
    }
  },

  // Watch
  watch: {
    character (value) {
      console.log('class info  char update.')
      if (value) {
        if (value.classPrimary) {
          this.getPrimaryArchetypes(value.classPrimary)
        }
        if (value.classSecondary) {
          this.getSecondaryArchetypes(value.classSecondary)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
