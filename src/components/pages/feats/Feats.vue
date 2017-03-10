<template>
  <div class="page-container">
    <xen-page-toolbar class="xen-theme-indigo" title="Feats">
    </xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Known">
      <div slot="Known">
        <!--<character-tab></character-tab>-->
      </div>
      <div slot="Browse">
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
  name: 'feats',

  // Components
  components: {
    // CharacterTab,
    // BackgroundTab
  }
}
</script>

<style scoped lang="scss">
</style>
