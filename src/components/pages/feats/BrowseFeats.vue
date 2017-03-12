<template>
  <section class="dndhub-tab-content">
    <!--BROWSE-->
    <div class="xen-data-table bordered hover" v-if="character">
      <table>
        <thead>
          <tr>
            <th class="xen-first-col text-left">
              Name
            </th>
            <th class="add-col text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in feats">
            <td class="xen-first-col"
            @click="selectItem(item);">
              {{ item.name }}
            </td>
            <td class="add-col text-center">
              <xen-icon-button class="xen-theme-blue"
              :raised="true" icon="add"
              @click.native="addItem(item);">
              </xen-icon-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <item-dialog
    :show="showDialog"
    :item="selectedItem"
    :title="dialogTitle"
    type="add"
    :edit="false"
    field="weapons"
    @hide="showDialog = false"
    @add="showDialog = false">
      <feat-inputs
      :item="selectedItem"
      :edit="false"
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
  name: 'browse-feats',

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
      dialogTitle: undefined
    }
  },

  // Methods
  methods: {
    selectItem (item) {
      this.selectedItem = item
      this.dialogTitle = item.name
      this.$nextTick(() => {
        this.showDialog = true
      })
    },

    addItem (item) {
      this.$bus.$emit('push_item', {
        key: this.field,
        value: item
      })
      this.$bus.$emit('toast', `${item.name} Added`)
    }
  },

  // Computed
  computed: {
    feats () {
      return this.$store.state.gameData.feats
    },

    character () {
      return this.$store.state.character
    }
  }
}
</script>

<style scoped lang="scss">
</style>
