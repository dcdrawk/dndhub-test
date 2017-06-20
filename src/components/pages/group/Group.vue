<template>
  <div class="page-container" v-if="group">
    <xen-page-toolbar class="xen-theme-indigo" :title="`Group - ${group.name}`">
    </xen-page-toolbar>
    <xen-tabs class="xen-page-tabs" theme="indigo" default-tab="Members">
      <div slot="Members">
        <members :group="group"></members>
        <!--Group Info 1
        {{ group }}-->
      </div>
      <div slot="Party">
        <!--<new-group></new-group>-->
      </div>
      <!--<div slot="NPCS">-->
        <!--<new-group></new-group>-->
      <!--</div>-->
      <!--<div slot="Quests">-->
        <!--<new-group></new-group>-->
      <!--</div>-->


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

  data () {
    return {
      group: undefined
    }
  },

  mounted () {
    console.log('we got group id?', this.groupId)
    if (this.groupId) {
      console.log('we got group id')
      this.getGroup()
    }
  },

  methods: {
    getGroup () {
      this.$firebase.database().ref(`/groups/${this.groupId}`)
      .on('value', (snapshot) => {
        this.group = snapshot.val()
        this.group.id = snapshot.key
      })
    }
  },

  computed: {
    groupId () {
      return this.$store.state.groupId
    }
  },

  watch: {
    groupId (newVal, oldVal) {
      if (oldVal) {
        this.$firebase.database().ref(`/groups/${oldVal}`).off()
      }
      if (newVal) {
        this.getGroup()
      }
      // return this.$store.state.groupId
    }
  }
}
</script>

<style scoped lang="scss">
</style>
