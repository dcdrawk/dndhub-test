<template>
  <section class="dndhub-tab-content">
    <xen-card>
      <div class="xen-table-buttons">
        <xen-button class="xen-theme-blue" :raised="true"
        @click.native="showNewDialog()">
          New Weapon
        </xen-button>
      </div>
    </xen-card>
    <div class="xen-data-table bordered hover striped" v-if="character">
      <table>
        <thead class="hide">
          <tr>
            <th class="xen-first-col text-left">
              Name
            </th>
            <th class="text-left">
              Damage
            </th>
            <th class="add-col text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in weapons">
            <td class="xen-first-col"
            @click="selectItem(item, index);">
              {{ item.name }}
            </td>
            <td class="text-left"
            @click="selectItem(item);">
              {{ item.damage }}
            </td>
            <td class="add-col text-center">
              <xen-icon-button class="xen-color-grey"
              icon="delete"
              @click.native="removeItem(item, item.id);">
              </xen-icon-button>
            </td>
          </tr>
          <tr v-if="character.weapons ? Object.keys(character.weapons).length === 0 : true">
            <td colspan="3" class="text-center">
              No Weapons Found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <item-dialog
      :show="showDialog"
      :title="dialogTitle"
      :item="selectedItem"
      :type="dialogType"
      :edit="edit"
      field="weapons"
      @hide="hideDialog()"
      @edit="edit = true;"
      @update="edit = false;"
      @cancel="selectedItem = $event; edit = false;">
        <weapon-inputs
        :item="selectedItem"
        :edit="edit"
        @input="$set(selectedItem, $event.prop, $event.value)">
        </weapon-inputs>
      </item-dialog>
    </div>
  </section>
</template>

<script>
import ItemDialog from '../../dialogs/ItemDialog'
import WeaponInputs from './WeaponInputs'

export default {
  // Name
  name: 'known-feats-tab',

  components: {
    ItemDialog,
    WeaponInputs
  },

  // Data
  data () {
    return {
      customItem: {},
      field: 'weapons',
      selectedItem: undefined,
      selectedItemId: undefined,
      showDialog: false,
      showCustomModal: false,
      dialogTitle: undefined,
      dialogType: 'edit',
      edit: false,
      editCopy: undefined
    }
  },

  // Methods
  methods: {
    selectItem (item, id) {
      this.dialogType = 'edit'
      this.selectedItem = Object.assign({}, item)
      this.dialogTitle = item.name
      this.$nextTick(() => {
        this.showDialog = true
      })
    },

    hideDialog () {
      this.edit = false
      this.showDialog = false
    },

    showNewDialog () {
      this.dialogType = 'custom'
      this.edit = true
      this.selectedItem = {}
      this.showDialog = true
    },

    removeItem (item, id) {
      this.$bus.$emit('remove_item', {
        key: this.field,
        id: id
      })
      this.$bus.$emit('toast', `${item.name} Removed`)
    }
  },

  // Computed
  computed: {
    character () {
      return this.$store.state.character
    },

    weapons () {
      let weapons = []
      for (var i in this.character.weapons) {
        let weapon = this.character.weapons[i]
        weapon.id = i
        weapons.push(weapon)
      }
      return weapons.sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
    }
  }
}
</script>

<style scoped lang="scss">
.custom-item {
  padding-top: 16px;
}
</style>
