<template>
  <section class="dndhub-tab-content">
    <xen-card v-if="character">
      <xen-card-header>
        <h2 class="title">Combat</h2>
      </xen-card-header>
      <xen-card-content>
        <div class="row">
          <div class="col-xs-6">
            <xen-input class="xen-color-primary"
            name="proficiency"
            label="Proficiency Bonus"
            type="number"
            :debounce="500"
            :value="character.proficiencyBonus"
            @input="$bus.$emit('update_character', {key: 'proficiencyBonus', value: $event})">
            </xen-input>
          </div>
          <div class="col-xs-6">
            <xen-input class="xen-color-primary"
            name="armorClass"
            label="Armor Class"
            type="number"
            :debounce="500"
            :value="character.armorClass"
            @input="$bus.$emit('update_character', {key: 'armorClass', value: $event})">
            </xen-input>
          </div>
          <div class="col-xs-6">
            <xen-input class="xen-color-primary xen-no-margin"
            name="initiative"
            label="Initiative"
            type="number"
            :debounce="500"
            :value="character.initiative"
            @input="$bus.$emit('update_character', {key: 'initiative', value: $event})">
            </xen-input>
          </div>
          <div class="col-xs-6">
            <xen-input class="xen-color-primary xen-no-margin"
            name="proficiency"
            label="Speed"
            type="number"
            :debounce="500"
            :value="character.speed"
            @input="$bus.$emit('update_character', {key: 'speed', value: $event})">
            </xen-input>
          </div>
        </div>
      </xen-card-content>
    </xen-card>

    <xen-card v-if="character">
      <xen-card-header>
        <h2 class="title">Hit Points</h2>
      </xen-card-header>
      <xen-card-content>
        <div class="row">
          <div class="col-xs-6">
            <xen-input class="xen-color-primary"
            name="proficiency"
            label="Current Hit Points"
            type="number"
            :value="character.hpCurrent"
            @input="$bus.$emit('update_character', {key: 'hpCurrent', value: $event})">
            </xen-input>
          </div>
          <div class="col-xs-6">
            <xen-input class="xen-color-primary"
            name="hpTemp"
            label="Temp Hit Points"
            type="number"
            :value="character.hpTemp"
            @input="$bus.$emit('update_character', {key: 'hpTemp', value: $event})">
            </xen-input>
          </div>
          <div class="col-xs-6">
            <xen-input class="xen-color-primary xen-no-margin"
            name="initiative"
            label="Max Hit Points"
            type="number"
            :value="character.hpMax"
            @input="$bus.$emit('update_character', {key: 'hpMax', value: $event})">
            </xen-input>
          </div>
          <div class="col-xs-6">
            <xen-input class="xen-color-primary xen-no-margin"
            name="proficiency"
            :disabled="true"
            label="Total Hit Points"
            type="number"
            :value="(+character.hpTemp || 0) + (+character.hpMax || 0)">
            </xen-input>
          </div>
        </div>
      </xen-card-content>
    </xen-card>

    <xen-card v-if="character">
      <xen-card-header>
        <h2 class="title">Death Saves</h2>
      </xen-card-header>
      <xen-card-content v-if="character.deathSaves">
        <!--<div class="row">-->
          <div class="death-saves">
            <span class="subheading">Success</span>
            <xen-checkbox class="death-save xen-color-primary"
            v-for="(save, index) in character.deathSaves.success"
            :key="index"
            :value="save"
            @input="updateDeathSave('success', index, $event)">
            </xen-checkbox>
          </div>
          <div class="death-saves">
            <span class="subheading">Fail</span>
            <xen-checkbox class="death-save xen-color-primary"
            v-for="(save, index) in character.deathSaves.fail"
            :value="save"
            @input="updateDeathSave('fail', index, $event)"
            :key="index">
            </xen-checkbox>
          </div>
        <!--</div>-->
      </xen-card-content>
    </xen-card>
  </section>
</template>

<script>
export default {
  // Name
  name: 'ability-scores-tab',

  mounted () {
    if (this.character) {
      this.checkDeathSaves()
    }
  },

  // Methods
  methods: {
    checkDeathSaves () {
      if (!this.character.deathSaves) {
        this.$set(this.character, 'deathSaves', {
          success: [false, false, false],
          fail: [false, false, false]
        })
      }
    },

    updateDeathSave (key, index, value) {
      console.log(key, index, value)
      // this.character.deathSaves[key][index] = value
      this.$set(this.character.deathSaves[key], index, value)
      // this.$set(this.character.deathSaves, key, value)
      this.$bus.$emit('update_character', {key: 'deathSaves', value: this.character.deathSaves})
    }
  },

  // Computed
  computed: {
    user () {
      return this.$store.state.user
    },

    character () {
      return this.$store.state.character
    }

    // skills () {
    //   return this.$store.state.gameData.skills
    // }

    // characterId () {
    //   return this.$store.state.characterId
    // },

    // refPath () {
    //   if (this.user && this.characterId) {
    //     return `/characters/${this.user.uid}/${this.characterId}`
    //   }
    // }
  },

  // Watch
  watch: {
    character (value) {
      // if (value) {
      //   if (!value.abilityScores) {
      //     this.setAbilityScores()
      //   }
      // }
    }
  }
}
</script>

<style scoped lang="scss">
// .xen-first-col {
//   width: 100px;
// }
.death-save {
  display: inline-block;
  vertical-align: middle;
}
.death-saves {
  display: flex;
  align-items: center;
  .subheading {
    vertical-align: middle;
    width: 100px;
  }
}
</style>
