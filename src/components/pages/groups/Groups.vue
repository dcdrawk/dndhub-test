<template>
  <div class="page-container">
    <xen-page-toolbar class="xen-theme-indigo" title="Groups">
    </xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="My Groups">
      <div slot="My Groups">
        <my-groups></my-groups>
      </div>
      <div slot="New Group">
        <new-group></new-group>
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
