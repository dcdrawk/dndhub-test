<template>
  <section>
    <div class="xen-data-table bordered striped"
     v-if="character">
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
            @click="selectItem(item);">
              <div>{{ item.name }}</div>
              <div class="secondary-text">{{ Object.keys(item.members).length }} Member</div>
            </td>
            <td class="add-col text-center">
              <!--<xen-icon-button class="xen-color-grey"
              icon="delete"
              @click.native="">
              </xen-icon-button>-->
              <xen-dropdown :open="open" @toggle="open = false"
              position="right">
                <xen-icon-button
                style="position: relative;"
                slot="target"
                icon="more_vert"

                :offset-left="50"
                @click.native="open = !open">
                </xen-icon-button>
                <div slot="menu">
                  <xen-list>
                    <xen-list-item text="Delete" icon="delete"></xen-list-item>
                  </xen-list>
                </div>
              </xen-dropdown>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import Hammer from 'hammerjs'
// import ItemDialog from '../../dialogs/ItemDialog'
// import SpellInputs from './SpellInputs'
// import SpellFilters from './SpellFilters'

export default {
  // Name
  name: 'my-groups',

  components: {
    // ItemDialog,
    // SpellInputs,
    // SpellFilters
  },

  // Data
  data () {
    return {
      groups: [],
      open: false,
      groupIds: undefined,
      groupsRef: undefined
      // field: 'spells',
      // selectedItem: undefined,
      // showDialog: false,
      // dialogTitle: undefined,
      // dialogType: 'edit',
      // edit: false,
      // spellFilters: {
      //   search: undefined,
      //   class: 'All',
      //   school: 'All',
      //   level: 'All',
      //   limit: 20,
      //   page: 1
      // },
      // showFilters: false
    }
  },

  created () {
    console.log(this)
    if (this.user) {
      this.getGroupIds()
    }
  },

  mounted () {
    console.log(this)
    console.log(Hammer)
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
      const length = Object.keys(groupIds).length
      let i = 0
      for (let id in groupIds) {
        this.$firebase.database().ref(`/groups/${id}`).once('value').then((snapshot) => {
          i++
          this.groups.push(snapshot.val())
          if (i >= length) {
            this.addSwipe()
          }
        })
      }
      // this.addSwipe()
    },

    addSwipe () {
      this.$nextTick(() => {
      // setTimeout(() => {
        console.log(this.$refs.rows)
        this.$refs.rows.forEach((row) => {
          // console.log(row)
          var hammertime = new Hammer(row)
          hammertime.on('swipe', (ev) => {
            console.log(ev)
            ev.preventDefault()
          })
        })
      // }, 0)
      })
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

    // hideDialog () {
    //   this.edit = false
    //   this.showDialog = false
    // },

    // showNewDialog () {
    //   this.dialogType = 'custom'
    //   this.dialogTitle = 'New Weapon'
    //   this.edit = true
    //   this.selectedItem = {}
    //   this.showDialog = true
    // },

    // removeItem (item, id) {
    //   this.$bus.$emit('remove_item', {
    //     key: this.field,
    //     id: id
    //   })
    //   this.$bus.$emit('toast', `${item.name} Removed`)
    // }
  },

  // Computed
  computed: {
    character () {
      return this.$store.state.character
    },

    user () {
      return this.$store.state.user
    }

    // groups () {
      // return this.$store.state.character

    // }

    // items () {
    //   let items = []
    //   for (var i in this.character[this.field]) {
    //     let item = this.character[this.field][i]
    //     item.id = i
    //     items.push(item)
    //   }
    //   return items.sort((a, b) => {
    //     if (a.name < b.name) return -1
    //     if (a.name > b.name) return 1
    //     return 0
    //   }).filter(item => {
    //     return this.spellFilters.class && this.spellFilters.class !== 'All'
    //     ? item.class.toLowerCase().includes(this.spellFilters.class.toLowerCase())
    //     : true
    //   }).filter(item => {
    //     return this.spellFilters.school && this.spellFilters.school !== 'All'
    //     ? item.school.toLowerCase().includes(this.spellFilters.school.toLowerCase())
    //     : true
    //   }).filter(item => {
    //     return this.spellFilters.search
    //     ? item.name.toLowerCase().includes(this.spellFilters.search.toLowerCase())
    //     : true
    //   }).filter(item => {
    //     return this.spellFilters.level && this.spellFilters.level !== 'All'
    //     ? item.level.toLowerCase().includes(this.spellFilters.level.toLowerCase())
    //     : true
    //   })
    // }
  },

  watch: {
    user (value) {
      this.getGroupIds()
    }
  }
}
</script>

<style scoped lang="scss">
// .custom-item {
//   padding-top: 16px;
// }
</style>
