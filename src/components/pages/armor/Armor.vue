<template>
  <div class="page-container">
    <xen-page-toolbar class="xen-theme-indigo" title="Weapons">
    </xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Known">
      <div slot="Known">
        <known-armor></known-armor>
      </div>
      <div slot="Browse">
        <browse-armor></browse-armor>
      </div>
    </xen-tabs>
  </div>
</template>

<script>
import BrowseArmor from './BrowseArmor'
import KnownArmor from './KnownArmor'

export default {
  // Name
  name: 'feats',

  // Components
  components: {
    BrowseArmor,
    KnownArmor
  }
}
</script>

<style scoped lang="scss">
</style>
