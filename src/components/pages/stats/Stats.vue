<template>
  <div class="page-container">
    <xen-page-toolbar class="xen-theme-indigo" title="Stats">
    </xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Ability Scores" @change="$bus.$emit('autosize')">
      <div slot="Ability Scores">
        <ability-score-tab v-once></ability-score-tab>
      </div>
      <div slot="Saving Throws">
        <saving-throws-tab v-if="show"></saving-throws-tab>
      </div>
      <div slot="Skills">
        <skills-tab v-if="show"></skills-tab>
      </div>
      <div slot="Combat">
        <combat-tab v-if="show"></combat-tab>
      </div>
    </xen-tabs>
  </div>
</template>

<script>
import AbilityScoreTab from './AbilityScoreTab'
import SavingThrowsTab from './SavingThrowsTab'
import SkillsTab from './SkillsTab'
import CombatTab from './CombatTab'
// import BackgroundTab from './BackgroundTab'

export default {
  // Name
  name: 'stats',

  // Components
  components: {
    AbilityScoreTab,
    SavingThrowsTab,
    SkillsTab,
    CombatTab
    // BackgroundTab
  },

  data () {
    return {
      show: false
    }
  },

  created () {
    this.$nextTick(() => {
      this.show = true
    })
  }
}
</script>

<style scoped lang="scss">
</style>
