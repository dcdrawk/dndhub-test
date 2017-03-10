<template>
  <div class="page-container">
    <xen-page-toolbar class="xen-theme-indigo" title="Class">
    </xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Class Info" @change="$bus.$emit('autosize')">
      <div slot="Class Info">
        <class-info-tab></class-info-tab>
        <!--<character-tab></character-tab>-->
      </div>
      <div slot="Features">
        <features-tab></features-tab>
        <!--<background-tab></background-tab>-->
      </div>
      <div slot="Proficiency">
        <proficiency-tab></proficiency-tab>
        <!--<background-tab></background-tab>-->
      </div>
    </xen-tabs>
  </div>
</template>

<script>
import ClassInfoTab from './ClassInfoTab'
import FeaturesTab from './FeaturesTab'
import ProficiencyTab from './ProficiencyTab'
// import BackgroundTab from './BackgroundTab'

export default {
  // Name
  name: 'class',

  // Components
  components: {
    ClassInfoTab,
    FeaturesTab,
    ProficiencyTab
    // CharacterTab,
    // BackgroundTab
  }
}
</script>

<style scoped lang="scss">
</style>
