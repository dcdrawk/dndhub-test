<template>
  <div class="page-container">
    <xen-page-toolbar class="xen-theme-indigo" title="Stats">
    </xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Ability Scores" @change="$bus.$emit('autosize')">
      <div slot="Ability Scores">
        <ability-score-tab></ability-score-tab>
      </div>
      <div slot="Saving Throws">
        <!--<background-tab></background-tab>-->
      </div>
    </xen-tabs>
  </div>
</template>

<script>
import AbilityScoreTab from './AbilityScoreTab'
// import BackgroundTab from './BackgroundTab'

export default {
  // Name
  name: 'stats',

  // Components
  components: {
    AbilityScoreTab
    // BackgroundTab
  }
}
</script>

<style scoped lang="scss">
</style>
