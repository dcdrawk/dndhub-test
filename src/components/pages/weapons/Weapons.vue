<template>
  <div class="page-container">
    <xen-page-toolbar class="xen-theme-indigo" title="Weapons">
    </xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Known">
      <div slot="Known">
        <known-weapons></known-weapons>
      </div>
      <div slot="Browse">
        <browse-weapons></browse-weapons>
      </div>
    </xen-tabs>
  </div>
</template>

<script>
import BrowseWeapons from './BrowseWeapons'
import KnownWeapons from './KnownWeapons'
// import BackgroundWeapons from './BackgroundWeapons'

export default {
  // Name
  name: 'feats',

  // Components
  components: {
    BrowseWeapons,
    KnownWeapons
    // CharacterWeapons,
    // BackgroundWeapons
  }
}
</script>

<style scoped lang="scss">
</style>
