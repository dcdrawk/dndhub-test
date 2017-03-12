<template>
  <div class="page-container">
    <xen-page-toolbar class="xen-theme-indigo" title="Feats">
    </xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Known">
      <div slot="Known">
        <!--<character-tab></character-tab>-->
        <known-feats></known-feats>
      </div>
      <div slot="Browse">
        <browse-feats></browse-feats>
        <!--<background-tab></background-tab>-->
      </div>
    </xen-tabs>
  </div>
</template>

<script>
import BrowseFeats from './BrowseFeats'
import KnownFeats from './KnownFeats'
// import BackgroundFeats from './BackgroundFeats'

export default {
  // Name
  name: 'feats',

  // Components
  components: {
    BrowseFeats,
    KnownFeats
    // CharacterFeats,
    // BackgroundFeats
  }
}
</script>

<style scoped lang="scss">
</style>
