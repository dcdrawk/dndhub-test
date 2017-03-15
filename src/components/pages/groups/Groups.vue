<template>
  <div class="page-container">
    <xen-page-toolbar class="xen-theme-indigo" title="Groups">
    </xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="My Groups">
      <div slot="My Groups">
        <known-spells></known-spells>
      </div>
      <div slot="New Group">
        <browse-spells></browse-spells>
      </div>
    </xen-tabs>
  </div>
</template>

<script>
import MyGroups from './MyGroups'
import NewGroup from './NewGroup'

export default {
  // Name
  name: 'feats',

  // Components
  components: {
    MyGroups,
    NewGroup
  }
}
</script>

<style scoped lang="scss">
</style>
