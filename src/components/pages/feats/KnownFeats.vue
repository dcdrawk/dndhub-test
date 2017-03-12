<template>
  <section class="dndhub-tab-content">
    <!--BROWSE-->
    <xen-card>
      <div class="xen-table-buttons">
        <xen-button class="xen-theme-blue" :raised="true"
        @click.native="showNewDialog()">
          New Feat
        </xen-button>
      </div>
    </xen-card>
    <div class="xen-data-table bordered hover" v-if="character">
      <table>
        <thead>
          <tr>
            <th class="xen-first-col text-left">
              Name
            </th>
            <th class="add-col text-center">
              Remove
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in feats">
            <td class="xen-first-col"
            @click="selectItem(item);">
              {{ item.name }}
            </td>
            <td class="add-col text-center">
              <xen-icon-button class="xen-color-grey"
              icon="delete"
              @click.native="removeItem(item, index);">
              </xen-icon-button>
            </td>
          </tr>
          <tr v-if="character.feats ? Object.keys(character.feats).length === 0 : true">
            <td colspan="2" class="text-center">
              No Feats Found.
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
    :field="field"
    @hide="hideDialog()"
    @edit="edit = true;"
    @update="edit = false;"
    @cancel="selectedItem = $event; edit = false;">
      <feat-inputs
      :item="selectedItem"
      :edit="edit"
      @input="$set(selectedItem, $event.prop, $event.value)">
      </feat-inputs>
    </item-dialog>
  </section>
</template>

<script>
import ItemDialog from '../../dialogs/ItemDialog'
import FeatInputs from './FeatInputs'

export default {
  // Name
  name: 'known-feats-tab',

  components: {
    ItemDialog,
    FeatInputs
  },

  // Data
  data () {
    return {
      field: 'feats',
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
      this.dialogTitle = 'New Feat'
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
    feats () {
      // return this.$store.state.gameData.feats
      let feats = []
      for (var i in this.character.feats) {
        let feat = this.character.feats[i]
        feat.id = i
        feats.push(feat)
      }
      return feats.sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
    },

    character () {
      return this.$store.state.character
    }
  }
}
</script>

<style scoped lang="scss">
.custom-item {
  padding-top: 16px;
}
</style>
