<template>
  <section>
    <div class="xen-data-table bordered striped"
     v-if="character">
     <xen-card>
      <div class="xen-table-buttons">
        <xen-button class="xen-theme-blue" :raised="true"
        @click.native="showNewDialog = true">
          New Group
        </xen-button>
        <xen-button class="xen-theme-blue" :raised="true"
        @click.native="showJoinDialog = true">
          Join Group
        </xen-button>
      </div>
    </xen-card>
     <!--<xen-list>
      <xen-list-item v-for="(item, index) in groups" :text="item.name">
        <div slot="dropdown">
          <xen-icon-button style="position: relative;" slot="target" icon="delete" @click.native="showDeleteDialog(key)"></xen-icon-button>
        </div>
      </xen-list-item>
    </xen-list>-->
      <table>
        <thead class="hide">
          <tr>
            <th class="xen-first-col text-left">
              Name
            </th>
            <th class="add-col text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in groups" ref="rows">
            <td class="xen-first-col"
            @click="selectItem(item, index);">
              <div>{{ item.name }}</div>
              <div class="secondary-text">{{ Object.keys(item.members).length }} Member<span v-if="Object.keys(item.members).length > 1">s</span></div>
            </td>
            <td class="add-col text-center"
            @click="">
              <xen-icon-button class="xen-color-grey"
              icon="more_vert"
              @click.native="$set(item, 'open', !item.open)">
              </xen-icon-button>
              <xen-dropdown :open="item.open" @toggle="item.open = false"
              position="right">
                <xen-icon-button
                style="position: relative;"
                slot="target"
                icon="more_vert"

                :offset-left="50"
                @click.native="$set(item, 'open', !item.open)">
                </xen-icon-button>
                <div slot="menu">
                  <xen-list :dense="true">
                    <xen-list-item
                    text="Invite Code" icon="person_add"
                    @click.native="selectedItem = item; showInviteDialog = true; item.open = false">
                    </xen-list-item>
                    <xen-list-item v-if="item.dm === user.uid"
                    text="Delete" icon="delete"
                    @click.native="selectedItem = item; showDeleteDialog = true; item.open = false">
                    </xen-list-item>
                    <xen-list-item v-else
                    text="Leave" icon="remove_circle"
                    @click.native="selectedItem = item; showLeaveDialog = true; item.open = false">
                    </xen-list-item>
                  </xen-list>
                </div>
              </xen-dropdown>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <xen-dialog title="New Group" :show="showNewDialog" @hide="showNewDialog = false">

      <div>
        <xen-input label="Group Name"
        :value="group.name"
        @input="group.name = $event"
        v-validate="'required'"
        name="group_name"
        :error="errors.first('group_name')">

        </xen-input>
        <!--<p>Invite code for {{selectedItem.name}}. Share with friends so they can join your group!</p>
        <p class="group-invite-code xen-theme-grey">{{selectedItem.id}}</p>-->
      </div>
        <div slot="actions">
          <div>
            <xen-button @click.native="$bus.$emit('back')" class="xen-color-default">
              Close
            </xen-button>
            <xen-button @click.native="createGroup(); showNewDialog = false" class="xen-theme-primary">
              Create
            </xen-button>
          </div>
        </div>
    </xen-dialog>

    <xen-dialog title="Join Group" :show="showJoinDialog" @hide="showJoinDialog = false">

      <div>
        <xen-input label="Invite Code"
        :value="group.inviteCode"
        @input="group.inviteCode = $event"
        v-validate="'required'"
        name="invite_code"
        :error="errors.first('invite_code')">

        </xen-input>

        {{ joinError }}
        <!--<p>Invite code for {{selectedItem.name}}. Share with friends so they can join your group!</p>
        <p class="group-invite-code xen-theme-grey">{{selectedItem.id}}</p>-->
      </div>
        <div slot="actions">
          <div>
            <xen-button @click.native="$bus.$emit('back')" class="xen-color-default">
              Close
            </xen-button>
            <xen-button @click.native="joinGroup(group.inviteCode); showJoinDialog = false" class="xen-theme-primary">
              Join
            </xen-button>
          </div>
        </div>
    </xen-dialog>

    <xen-dialog title="Leave Group" :show="showLeaveDialog" @hide="showLeaveDialog = false">
      <div>
        <p>Are you sure you want to leave the group?</p>
      </div>
        <div slot="actions">
          <div>
            <xen-button @click.native="$bus.$emit('back')" class="xen-color-default">
              Close
            </xen-button>
            <xen-button @click.native="leaveGroup(selectedItem); showLeaveDialog = false" class="xen-theme-blue">
              Leave
            </xen-button>
          </div>
        </div>
    </xen-dialog>

    <xen-dialog title="Invite Code" :show="showInviteDialog" @hide="showInviteDialog = false">

      <div v-if="selectedItem">
        <p>Invite code for {{selectedItem.name}}. Share with friends so they can join your group!</p>
        <p class="group-invite-code xen-theme-grey">{{selectedItem.id}}</p>
      </div>
        <div slot="actions">
          <div>
            <xen-button @click.native="$bus.$emit('back')" class="xen-color-default">
              Close
            </xen-button>
          </div>
        </div>
    </xen-dialog>

    <xen-dialog title="Delete Group" :show="showDeleteDialog" @hide="showDeleteDialog = false">

      <div v-if="selectedItem">
        Are you sure you want to delete {{selectedItem.name}}?
      </div>
        <div slot="actions">
          <div>
            <xen-button @click.native="$bus.$emit('back')" class="xen-color-default">
              Cancel
            </xen-button>
            <xen-button @click.native="deleteGroup(selectedItem); showDeleteDialog = false" class="xen-theme-red">
              Delete
            </xen-button>
          </div>
        </div>
    </xen-dialog>
  </section>
</template>

<script>
export default {
  // Name
  name: 'my-groups',

  // Data
  data () {
    return {
      groups: [],
      open: false,
      groupIds: undefined,
      groupsRef: undefined,
      showDeleteDialog: false,
      showInviteDialog: false,
      showJoinDialog: false,
      showLeaveDialog: false,
      selectedItem: undefined,
      showNewDialog: false,
      joinError: undefined,
      group: {
        name: ''
      }
    }
  },

  created () {
    // console.log(this)
    if (this.user) {
      this.getGroupIds()
    }
  },

  // Methods
  methods: {
    getGroupIds () {
      console.log('get the groups')
      this.groupsRef = this.$firebase.database().ref(`/users/${this.user.uid}/groups`)
      this.groupsRef.on('value', snapshot => {
        this.getGroups(snapshot.val())
      })
    },

    getGroups (groupIds) {
      this.groups = []
      for (let id in groupIds) {
        this.$firebase.database().ref(`/groups/${id}`).once('value').then((snapshot) => {
          let group = snapshot.val()
          group.id = snapshot.key
          this.groups.push(group)
        })
      }
    },

    async createGroup () {
      try {
        await this.$validator.validateAll()
        const ref = await this.$firebase.database().ref(`/groups`).push(this.group)
        let updates = {}
        updates[`/members/${this.user.uid}`] = true
        await ref.update(updates)
        await this.$firebase.database().ref(`/users/${this.user.uid}/groups/${ref.key}`).set(true)
      } catch (error) {
        console.warn(error)
      }
    },

    async joinGroup (id) {
      try {
        await this.$validator.validateAll()
        const snapshot = await this.$firebase.database().ref(`/groups/${id}`).once('value')
        console.log(snapshot.val())
        if (snapshot.val() === null) {
          const error = 'Invalid Invite Code'
          throw error
        }
        console.log(this.user.uid)
        this.$firebase.database().ref(`/groups/${id}/members/${this.user.uid}`).set(true)
        this.$firebase.database().ref(`/users/${this.user.uid}/groups/${id}`).set(true)
        // const ref = await this.$firebase.database().ref(`/groups`).push(this.group)
        // let updates = {}
        // updates[`/members/${this.user.uid}`] = true
        // await ref.update(updates)
        // await this.$firebase.database().ref(`/users/${this.user.uid}/groups/${ref.key}`).set(true)
      } catch (error) {
        console.log(error)
        this.joinError = error
        // console.warn(error)
      }
    },

    selectItem (item, id) {
      // const groupRef = this.$firebase.database().ref(`/groups/${id}`)
      this.$store.commit('select_group', item.id)
      this.$router.push({name: 'Group'})
    },

    leaveGroup (group) {
      console.log(group)
      this.$firebase.database().ref(`/groups/${group.id}/members/${this.user.uid}`).set(null)
      this.$firebase.database().ref(`/users/${this.user.uid}/groups/${group.id}`).set(null)
    },

    deleteGroup (group) {
      console.log(group)
      for (let i in group.members) {
        this.$firebase.database().ref(`/users/${i}/groups/${group.id}`).remove()
      }
      this.$firebase.database().ref(`/groups/${group.id}`).remove()
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
    user (value) {
      this.getGroupIds()
    }
  }
}
</script>

<style scoped lang="scss">
.group-invite-code {
  padding: 10px;
  background-color: #eee;
  border: 1px solid rgba(0, 0, 0, 0.25)
}

</style>
