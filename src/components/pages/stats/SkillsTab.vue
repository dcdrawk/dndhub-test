<template>
  <section class="dndhub-tab-content">
    <xen-card v-if="character">
      <div class="xen-data-table dnd-table-dense striped">
        <table>
          <thead>
            <tr>
              <th class="xen-first-col">
                Skill
              </th>
              <th class="text-center">
                Training
              </th>
              <th class="text-center">
                Bonus
              </th>
              <th class="text-center">
                Total
              </th>
            </tr>
          </thead>
          <tbody v-if="character.skills">
            <tr v-for="skill in skills" v-if="character.skills[skill.name]">
              <td class="xen-first-col">{{ skill.name }}</td>
              <td class="text-center">
                <xen-checkbox class="xen-color-primary"
                :value="character.skills[skill.name].trained"
                @input="updateSkills(skill.name, 'trained', $event)">
                </xen-checkbox>
              </td>
              <td class="text-center">
                <xen-input class="xen-color-primary small-table-input"
                type="number"
                :value="+character.skills[skill.name].bonus"
                @input="updateSkills(skill.name, 'bonus', $event)">
                </xen-input>
              </td>
              <td class="text-center">
                <xen-input :disabled="true"
                class="xen-color-primary small-table-input"
                type="number"
                :value="getSkillTotal(skill)">
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

  mounted () {
    if (this.character) {
      if (!this.character.skills) {
        this.checkSkills()
      }
    }
  },

  // Methods
  methods: {
    // Check the character for the skills attribute
    checkSkills () {
      if (!this.character.skills) {
        this.$set(this.character, 'skills', {})
      }
      this.skills.forEach(skill => {
        if (!this.character.skills.hasOwnProperty(skill.name)) {
          this.$set(this.character.skills, skill.name, { trained: false, bonus: 0 })
        } else {
          if (!this.character.skills[skill.name].trained) {
            this.$set(this.character.skills[skill.name], 'trained', false)
          }
          if (!this.character.skills[skill.name].bonus) {
            this.$set(this.character.skills[skill.name], 'bonus', 0)
          }
        }
      })
      this.$bus.$emit('update_character', { key: 'skills', value: this.character.skills })
    },

    updateSkills (skill, key, value) {
      this.$store.commit('update_skills', {
        skill: skill,
        key: key,
        value: value
      })
      this.$firebase.database().ref(`/${this.refPath}/skills/${skill}/${key}`).set(value)
    },

    // Return the modifier for an ability score
    getAbilityScoreModifier (score) {
      const base = +this.character.abilityScores[score].base
      const bonus = +this.character.abilityScores[score].bonus
      const total = base + bonus
      return Math.floor((parseInt(total, 0) / 2 - 5))
    },

    getSkillTotal (skill) {
      let modifier = this.getAbilityScoreModifier(skill.abilityScore)
      if (this.character.skills[skill.name].trained) {
        modifier += +this.character.proficiencyBonus || 0
      }
      return modifier + +this.character.skills[skill.name].bonus
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

    skills () {
      return this.$store.state.gameData.skills
      .sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
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
