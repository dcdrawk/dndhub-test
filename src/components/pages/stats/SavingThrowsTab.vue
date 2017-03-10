<template>
  <section class="dndhub-tab-content">
    <xen-card v-if="character">
          <div class="xen-data-table dnd-table-dense striped">
             <!--{{ character.abilityScores }}-->
            <table>
              <thead>
                <tr>
                  <th class="xen-first-col">
                    Stat
                  </th>
                  <th class="text-center">
                    Proficiency
                  </th>
                  <th class="text-center">
                    Bonus
                  </th>
                  <th class="text-center">
                    Modifier
                  </th>
                </tr>
              </thead>
              <tbody v-if="character.savingThrows">
                <tr v-for="score in abilityScores" v-if="character.savingThrows[score.name]">
                  <td class="xen-first-col">{{ score.name }}</td>
                  <td class="text-center">
                    <xen-checkbox class="xen-color-primary"
                    :value="character.savingThrows[score.name].proficiency"
                    @input="updateSavingThrows(score.name, 'proficiency', $event)">

                    </xen-checkbox>
                    <!--<xen-input class="xen-color-primary small-table-input"
                    type="number"
                    :value="+character.abilityScores[score.name].base"
                    @input="updateSavingThrows(score.name, 'base', $event)">
                    </xen-input>-->
                  </td>
                  <td class="text-center">
                    <xen-input class="xen-color-primary small-table-input"
                    type="number"
                    :value="+character.savingThrows[score.name].bonus"
                    @input="updateSavingThrows(score.name, 'bonus', $event)">
                    </xen-input>
                  </td>
                  <td class="text-center">
                    <xen-input :disabled="true"
                    class="xen-color-primary small-table-input"
                    type="number"
                    :value="getSavingThrowModifier(score.name)">
                    </xen-input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

    </xen-card>
  </section>
</template>

<script>
export default {
  // Name
  name: 'ability-scores-tab',

  // Data
  data () {
    return {
      abilityScores: [{
        name: 'Strength'
      }, {
        name: 'Dexterity'
      }, {
        name: 'Constitution'
      }, {
        name: 'Intelligence'
      }, {
        name: 'Wisdom'
      }, {
        name: 'Charisma'
      }]
    }
  },

  mounted () {
    if (this.character) {
      if (!this.character.savingThrows) {
        this.setSavingThrows()
      }
    }
  },

  // Methods
  methods: {
    // Set the ability scores
    setSavingThrows () {
      this.$set(this.character, 'savingThrows', {
        Strength: {
          proficiency: false,
          bonus: 0
        },
        Dexterity: {
          proficiency: false,
          bonus: 0
        },
        Constitution: {
          proficiency: false,
          bonus: 0
        },
        Intelligence: {
          proficiency: false,
          bonus: 0
        },
        Wisdom: {
          proficiency: false,
          bonus: 0
        },
        Charisma: {
          proficiency: false,
          bonus: 0
        }
      })
      this.$bus.$emit('update_character', { key: 'savingThrows', value: this.character.savingThrows })
    },

    updateSavingThrows (score, key, value) {
      console.log(score, key, value)
      this.$store.commit('update_saving_throw', {
        score: score,
        key: key,
        value: value
      })
      this.$firebase.database().ref(`/${this.refPath}/savingThrows/${score}/${key}`).set(value)
    },

    // Return the modifier for an ability score
    getAbilityScoreModifier (score) {
      const base = +this.character.abilityScores[score].base
      const bonus = +this.character.abilityScores[score].bonus
      const total = base + bonus
      return Math.floor((parseInt(total, 0) / 2 - 5))
    },

    getSavingThrowModifier (score) {
      let modifier = this.getAbilityScoreModifier(score)
      if (this.character.savingThrows[score].proficiency) {
        modifier += +this.character.proficiencyBonus || 0
      }
      return modifier + +this.character.savingThrows[score].bonus
    }
  },

  // Computed
  computed: {
    user () {
      return this.$store.state.user
    },

    character () {
      return this.$store.state.character
    },

    characterId () {
      return this.$store.state.characterId
    },

    refPath () {
      if (this.user && this.characterId) {
        return `/characters/${this.user.uid}/${this.characterId}`
      }
    }
  },

  // Watch
  watch: {
    character (value) {
      if (value) {
        if (!value.abilityScores) {
          this.setAbilityScores()
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.xen-first-col {
  width: 100px;
}
</style>
