<template>
  <div class="page-container">
    <xen-page-toolbar class="xen-theme-indigo" title="Feats">
    </xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Known">
      <div slot="Known">
        <!--<character-tab></character-tab>-->
      </div>
      <div slot="Browse">
        <browse-tab></browse-tab>
        <!--<background-tab></background-tab>-->
      </div>
    </xen-tabs>
  </div>
</template>

<script>
import BrowseTab from './BrowseTab'
// import BackgroundTab from './BackgroundTab'

export default {
  // Name
  name: 'feats',

  // Components
  components: {
    BrowseTab
    // CharacterTab,
    // BackgroundTab
  }
}
</script>

<style scoped lang="scss">
</style>
