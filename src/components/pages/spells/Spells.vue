<template>
  <div class="page-container">
    <xen-page-toolbar class="xen-theme-indigo" title="Spells">
    </xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Known">
      <div slot="Known">
        <known-spells></known-spells>
      </div>
      <div slot="Browse">
        <browse-spells></browse-spells>
      </div>
    </xen-tabs>
  </div>
</template>

<script>
import BrowseSpells from './BrowseSpells'
import KnownSpells from './KnownSpells'

export default {
  // Name
  name: 'feats',

  // Components
  components: {
    BrowseSpells,
    KnownSpells
  }
}
</script>

<style scoped lang="scss">
</style>
