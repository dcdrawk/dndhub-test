<template>
  <section class="dndhub-tab-content">
    <xen-card>
      <div class="xen-table-buttons">
        <xen-button class="xen-theme-blue" :raised="true"
        @click.native="showNewDialog()">
          Add Spells
        </xen-button>
      </div>
    </xen-card>
    <div class="xen-data-table bordered striped" v-if="character">
      <table>
        <thead class="hide">
          <tr>
            <th class="xen-first-col text-left">
              Name
            </th>
            <th class="text-left">
              Spells Class
            </th>
            <th class="add-col text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items">
            <td class="xen-first-col"
            @click="selectItem(item, index);">
              {{ item.name }}
            </td>
            <td class="text-left"
            @click="selectItem(item);">
              {{ item.ac }}
            </td>
            <td class="add-col text-center">
              <xen-icon-button class="xen-color-grey"
              icon="delete"
              @click.native="removeItem(item, item.id);">
              </xen-icon-button>
            </td>
          </tr>
          <tr v-if="items ? items.length === 0 : true">
            <td colspan="3" class="text-center">
              No Spells Found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <item-dialog
    :show="showDialog"
    :title="dialogTitle"
    :item="selectedItem"
    :type="dialogType"
    :edit="edit"
    field="spells"
    @hide="hideDialog()"
    @edit="edit = true;"
    @update="edit = false;"
    @cancel="selectedItem = $event; edit = false;">
      <spells-inputs
      :item="selectedItem"
      :edit="edit"
      @input="$set(selectedItem, $event.prop, $event.value)">
      </spells-inputs>
    </item-dialog>
  </section>
</template>

<script>
import ItemDialog from '../../dialogs/ItemDialog'
import SpellInputs from './SpellInputs'

export default {
  // Name
  name: 'known-spells',

  components: {
    ItemDialog,
    SpellInputs
  },

  // Data
  data () {
    return {
      field: 'spells',
      selectedItem: undefined,
      showDialog: false,
      dialogTitle: undefined,
      dialogType: 'edit',
      edit: false
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
      this.dialogTitle = 'New Weapon'
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

    items () {
      let items = []
      for (var i in this.character[this.field]) {
        let item = this.character[this.field][i]
        item.id = i
        items.push(item)
      }
      return items.sort((a, b) => {
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
