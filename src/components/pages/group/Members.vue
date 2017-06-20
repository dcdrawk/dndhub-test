<template>
  <section>
    <div class="xen-data-table bordered striped"
     v-if="group">
      <xen-card>
        <div class="xen-table-buttons">
          <xen-button class="xen-theme-blue" :raised="true"
          @click.native="showInviteDialog = true">
            Invite Code
          </xen-button>
        </div>
      </xen-card>
      <table>
        <thead class="hide">
          <tr>
            <th class="xen-first-col text-left">
              Name
            </th>
          </tr>
        </thead>
        <tbody v-if="!loading">
          <tr v-for="(item, index) in members" ref="rows">
            <td class="xen-first-col">
              <div>
                <span v-if="index === group.dm">
                  <i class="material-icons xen-color-amber xen-no-margin">star</i>
                </span>
                {{ item.displayName }}
                <strong v-if="index === group.dm">
                  (DM)
                </strong>
              </div>
              <div class="secondary-text"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <xen-dialog title="Invite Code" :show="showInviteDialog" @hide="showInviteDialog = false">

      <div v-if="group">
        <p>Invite code for {{group.name}}. Share with friends so they can join your group!</p>
        <p class="group-invite-code xen-theme-grey">{{group.id}}</p>
      </div>
        <div slot="actions">
          <div>
            <xen-button @click.native="$bus.$emit('back')" class="xen-color-default">
              Close
            </xen-button>
          </div>
        </div>
    </xen-dialog>

  </section>
</template>

<script>
// import Hammer from 'hammerjs'
// import ItemDialog from '../../dialogs/ItemDialog'
// import SpellInputs from './SpellInputs'
// import SpellFilters from './SpellFilters'

export default {
  // Name
  name: 'members',

  props: {
    group: Object
  },

  components: {
  },

  // Data
  data () {
    return {
      members: {},
      loading: false,
      showInviteDialog: false
    }
  },

  created () {
    if (this.group) {
      this.getMembers()
    }
  },

  mounted () {
    const memberRef = this.$firebase.database().ref(`/groups/${this.group.id}/members`)
    memberRef.on('child_added', (snapshot) => {
      // console.log('ekofpeskpfos', snapshot)
      // console.log(snapshot.val())
      // this.$set(this.members, snapshot.key, snapshot.val())

      this.$firebase.database().ref(`/users/${snapshot.key}`).on('value', (snapshot) => {
        this.$nextTick(() => {
          this.$set(this.members, snapshot.key, snapshot.val())
        })
      })
    })
    memberRef.on('child_removed', (snapshot) => {
      console.log('member removed...')
      this.$firebase.database().ref(`/users/${snapshot.key}`).off()
      this.$delete(this.members, snapshot.key)
    })
    // console.log(this)
    // console.log(Hammer)
  },

  // Methods
  methods: {
    getGroupIds () {
      // console.log('get the groups')
      // this.groupsRef = this.$firebase.database().ref(`/users/${this.user.uid}/groups`)
      // this.groupsRef.on('value', snapshot => {
      //   this.getGroups(snapshot.val())
      // })
    },

    getMembers () {
      for (let i in this.group.members) {
        console.log(i)
        this.$firebase.database().ref(`/users/${i}`).on('value', (snapshot) => {
          this.$nextTick(() => {
            this.$set(this.members, snapshot.key, snapshot.val())
          })
        })
      }
    },

    selectItem (item, id) {
      console.log(item)
    //   this.dialogType = 'edit'
    //   this.selectedItem = Object.assign({}, item)
    //   this.dialogTitle = item.name
    //   this.$nextTick(() => {
    //     this.showDialog = true
    //   })
    }
  },

  // Computed
  computed: {
    character () {
      return this.$store.state.character
    },

    user () {
      return this.$store.state.user
    }
  },

  watch: {
    group (newVal, oldVal) {
      this.loading = true
      if (oldVal) {
        for (let i in oldVal.members) {
          this.$firebase.database().ref(`/users/${i}`).off()
          this.$delete(this.members, i)
        }
      }
      if (newVal) {
        // this.members = undefined
        this.getMembers()
        // this.members = undefined
      }
      this.$nextTick(() => {
        this.loading = false
      })
      // this.getGroupIds()
    }
  }
}
</script>

<style scoped lang="scss">
// .custom-item {
//   padding-top: 16px;
// }
.xen-data-table td.xen-first-col i {
  margin-left: 0;
  margin-right: 8px;
  vertical-align: middle;
  display: inline-block;
}
.group-invite-code {
  padding: 10px;
  background-color: #eee;
  border: 1px solid rgba(0, 0, 0, 0.25)
}

</style>
