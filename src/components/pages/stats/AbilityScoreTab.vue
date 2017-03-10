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
                Base
              </th>
              <th class="text-center">
                Bonus
              </th>
              <th class="text-center">
                Modifier
              </th>
            </tr>
          </thead>
          <tbody v-if="character.abilityScores">
            <tr v-for="score in abilityScores" v-if="character.abilityScores[score.name]">
              <td class="xen-first-col">{{ score.name }}</td>
              <td class="text-center">
                <xen-input class="xen-color-primary small-table-input"
                type="number"
                :value="+character.abilityScores[score.name].base"
                @input="updateAbilityScore(score.name, 'base', $event)">
                </xen-input>
              </td>
              <td class="text-center">
                <xen-input class="xen-color-primary small-table-input"
                type="number"
                :value="+character.abilityScores[score.name].bonus"
                @input="updateAbilityScore(score.name, 'bonus', $event)">
                </xen-input>
              </td>
              <td class="text-center">
                <xen-input :disabled="true"
                class="xen-color-primary small-table-input"
                type="number"
                :value="getAbilityScoreModifier(score.name)">
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
      if (!this.character.abilityScores) {
        this.setAbilityScores()
      }
    }
  },

  // Methods
  methods: {
    // Set the ability scores
    setAbilityScores () {
      this.$set(this.character, 'abilityScores', {
        Strength: {
          base: 0,
          bonus: 0
        },
        Dexterity: {
          base: 0,
          bonus: 0
        },
        Constitution: {
          base: 0,
          bonus: 0
        },
        Intelligence: {
          base: 0,
          bonus: 0
        },
        Wisdom: {
          base: 0,
          bonus: 0
        },
        Charisma: {
          base: 0,
          bonus: 0
        }
      })
      this.$bus.$emit('update_character', { key: 'abilityScores', value: this.character.abilityScores })
    },

    updateAbilityScore (score, key, value) {
      this.$store.commit('update_ability_score', {
        score: score,
        key: key,
        value: value
      })
      this.$firebase.database().ref(`/${this.refPath}/abilityScores/${score}/${key}`).set(value)
    },

    // Return the modifier for an ability score
    getAbilityScoreModifier (name) {
      const base = +this.character.abilityScores[name].base
      const bonus = +this.character.abilityScores[name].bonus
      const total = base + bonus
      return Math.floor((parseInt(total, 0) / 2 - 5))
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
