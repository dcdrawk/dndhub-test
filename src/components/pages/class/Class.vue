<template>
  <div class="page-container">
    <xen-page-toolbar class="xen-theme-indigo" title="Class">
    </xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Class Info" @change="$bus.$emit('autosize')">
      <div slot="Class Info">
        <!--<character-tab></character-tab>-->
      </div>
      <div slot="Abilities">
        <!--<background-tab></background-tab>-->
      </div>
    </xen-tabs>
  </div>
</template>

<script>
// import CharacterTab from './CharacterTab'
// import BackgroundTab from './BackgroundTab'

export default {
  // Name
  name: 'class',

  // Components
  components: {
    // CharacterTab,
    // BackgroundTab
  }
}
</script>

<style scoped lang="scss">
</style>
