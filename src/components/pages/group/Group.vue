<template>
  <div class="page-container">
    <xen-page-toolbar class="xen-theme-indigo" :title="`Group - ${group.name}`">
    </xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Members">
      <div slot="Members">
        <members></members>
        <!--Group Info 1
        {{ group }}-->
      </div>
      <div slot="Party">
        <!--<new-group></new-group>-->
      </div>
      <div slot="NPCS">
        <!--<new-group></new-group>-->
      </div>
      <div slot="Quests">
        <!--<new-group></new-group>-->
      </div>


      <!--<div slot="Chat">
      </div>-->
    </xen-tabs>
  </div>
</template>

<script>
import Members from './Members'
import NewGroup from './NewGroup'

export default {
  // Name
  name: 'group',

  // Components
  components: {
    Members,
    NewGroup
  },

  computed: {
    group () {
      return this.$store.state.group
    }
  }
}
</script>

<style scoped lang="scss">
</style>
