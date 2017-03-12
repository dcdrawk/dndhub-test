<template>
  <section class="dndhub-tab-content">
    <xen-card>
      <xen-card-content class="xen-table-search">
        <xen-input placeholder="Search Spells"
        class="xen-color-primary"
        :value="filter"
        @input="filter = $event">
        </xen-input>
        <i v-if="filter" class="material-icons clear-input"
        @click="filter = undefined">close</i>
      </xen-card-content>
    </xen-card>
    <div class="xen-data-table bordered striped" v-if="character">
      <table>
        <thead>
          <tr>
            <th class="xen-first-col text-left">
              Spell
            </th>
            <!--<th class="text-left">
              Spells Class
            </th>-->
            <th class="add-col text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items">
            <td class="xen-first-col"
            @click="selectItem(item);">
              {{ item.name }}
            </td>
            <!--<td class="text-left"
            @click="selectItem(item);">
              {{ item.ac }}
            </td>-->
            <td class="add-col text-center">
              <xen-icon-button class="xen-theme-blue"
              :raised="true" icon="add"
              @click.native="addItem(item);">
              </xen-icon-button>
            </td>
          </tr>
          <tr v-if="items.length === 0">
            <td colspan="3" class="text-center">No Spells Found</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Selected Item Dialog -->
    <div>
      <item-dialog
      :show="showDialog"
      :item="selectedItem"
      :title="dialogTitle"
      type="add"
      :edit="false"
      field="weapons"
      @hide="showDialog = false"
      @add="showDialog = false">
        <spells-inputs
        :item="selectedItem"
        @input="$set(selectedItem, $event.prop, $event.value)">
        </spells-inputs>
      </item-dialog>
    </div>

  </section>
</template>

<script>
import ItemDialog from '../../dialogs/ItemDialog'
import SpellInputs from './SpellInputs'

export default {
  // Name
  name: 'browse-feats-tab',

  components: {
    ItemDialog,
    SpellInputs
  },

  // Data
  data () {
    return {
      field: 'spells',
      filter: undefined,
      selectedItem: undefined,
      showDialog: false,
      dialogTitle: undefined
    }
  },

  // Methods
  methods: {
    addItem (item) {
      this.$bus.$emit('push_item', {
        key: this.field,
        value: item
      })
      this.$bus.$emit('toast', `${item.name} Added`)
    },

    selectItem (item) {
      console.log(item)
      this.selectedItem = item
      this.dialogTitle = item.name
      this.$nextTick(() => {
        this.showDialog = true
      })
    }
  },

  // Computed
  computed: {
    items () {
      return this.$store.state.gameData[this.field]
      .sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      }).filter(item => {
        return this.filter
        ? item.name.toLowerCase().includes(this.filter.toLowerCase())
        : true
      })
    },

    character () {
      return this.$store.state.character
    }
  }
}
</script>

<style scoped lang="scss">
</style>
