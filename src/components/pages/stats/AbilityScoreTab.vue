<template>
  <section class="dndhub-tab-content">
    <xen-card v-if="character">
          <div class="xen-data-table striped">
             {{ character.abilityScores }}
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
                  <!--<td class="text-center" v-if="character.abilityScores[score.name]">
                     <xen-input class="xen-color-primary small-table-input" type="number" :value="+character.abilityScores[score.name].bonus || 0"
                     @input="$set(character.abilityScores[score.name], 'bonus', $event); $root.updateCharacter('abilityScores/' + score.name + '/', 'bonus', character.abilityScores[score.name].bonus);"></xen-input>-->
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
      // subraces: undefined
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
      console.log(this.character.abilityScores)
      this.$bus.$emit('update_character', { key: 'abilityScores', value: this.character.abilityScores })
      this.$root.updateCharacter('', 'abilityScores', this.character.abilityScores)
    },

    updateAbilityScore (score, key, value) {
      console.log('oopdate')
      console.log(this.$root)
      console.log(`${this.refPath}/abilityScores/${score}/${key}`)
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
      // score = !isNaN(score) ? score : 0
      // bonus = !isNaN(bonus) ? bonus : 0
      const total = base + bonus
      return Math.floor((parseInt(total, 0) / 2 - 5))
    }
    // Get the list of subraces from a race
    // getSubraces (raceName) {
    //   if (this.races) {
    //     if (raceName !== this.character.race) {
    //       this.$set(this.character, 'subrace', undefined)
    //       this.$bus.$emit('update_character', {key: 'subrace', value: null})
    //     }
    //     this.races.forEach((race, index) => {
    //       if (race.name === raceName) {
    //         this.subraces = race.subraces
    //         return
    //       }
    //     })
    //   }
    // }
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

    // races () {
    //   return this.$store.state.gameData.races
    // }
  },

  // Watch
  watch: {
    character (value) {
      if (value) {
        // this.getSubraces(value.race)
        if (!value.abilityScores) {
          this.setAbilityScores()
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
