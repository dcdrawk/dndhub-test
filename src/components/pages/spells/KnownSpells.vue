<template>
  <section v-if="character">
    <!-- Filters -->
    <spell-filters v-if="character.spellFilters"
    :filter="character.spellFilters"
    :expand="showFilters"
    @toggle="showFilters = $event">
    </spell-filters>

    <!-- Table -->
    <div class="xen-data-table bordered striped"
    :class="{'show-filters': showFilters}"
     v-if="character">
      <table>
        <thead class="hide">
          <tr>
            <th class="xen-first-col text-left">
              Spell
            </th>
            <th class="add-col text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items">
            <td class="xen-first-col"
            @click="selectItem(item);">
              <div>{{ item.name }}</div>
              <div class="secondary-text">{{ item.level }} {{ item.school }}</div>
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

    <!-- Pagination -->
    <dnd-pagination v-if="character.spellFilters"
    :page="page"
    :total="Math.ceil(items.length / character.spellFilters.limit)"
    @input="character.spellFilters.page = $event">
    </dnd-pagination>

    <!-- Item Dialog -->
    <item-dialog class="dnd-spell-dialog"
    :show="showDialog"
    :title="dialogTitle"
    :item="selectedItem"
    :type="dialogType"
    :edit="edit"
    field="spells"
    @hide="hideDialog()"
    @edit=" edit = true;"
    @update="dialogTitle = selectedItem.name; edit = false;"
    @cancel="selectedItem = $event; edit = false;">
      <spell-inputs
      :item="selectedItem"
      :edit="edit"
      @input="$set(selectedItem, $event.prop, $event.value)">
      </spell-inputs>
    </item-dialog>
  </section>
</template>

<script>
import ItemDialog from '../../dialogs/ItemDialog'
import SpellInputs from './SpellInputs'
import SpellFilters from './SpellFilters'
import DndPagination from '../../pagination/Pagination'

export default {
  // Name
  name: 'known-spells',

  components: {
    ItemDialog,
    SpellInputs,
    SpellFilters,
    DndPagination
  },

  // Data
  data () {
    return {
      field: 'spells',
      selectedItem: undefined,
      showDialog: false,
      dialogTitle: undefined,
      dialogType: 'edit',
      edit: false,
      showFilters: false
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
    },

    checkFilters () {
      if (this.character.spellFilters) {
        return
      } else {
        this.$bus.$emit('update_character', {key: 'spellFilters', value: {}})
      }
    }
  },

  // Computed
  computed: {
    character () {
      return this.$store.state.character
    },

    page () {
      if (this.character.spellFilters) {
        return this.character.spellFilters.page <= Math.ceil(this.items.length / this.character.spellFilters.limit)
        ? this.character.spellFilters.page
        : Math.ceil(this.items.length / this.character.spellFilters.limit)
      }
    },

    items () {
      this.checkFilters()
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
      }).filter(item => {
        return this.character.spellFilters.class && this.character.spellFilters.class !== 'All'
        ? item.class.toLowerCase().includes(this.character.spellFilters.class.toLowerCase())
        : true
      }).filter(item => {
        return this.character.spellFilters.school && this.character.spellFilters.school !== 'All'
        ? item.school.toLowerCase().includes(this.character.spellFilters.school.toLowerCase())
        : true
      }).filter(item => {
        return this.character.spellFilters.search
        ? item.name.toLowerCase().includes(this.character.spellFilters.search.toLowerCase())
        : true
      }).filter(item => {
        return this.character.spellFilters.level && this.character.spellFilters.level !== 'All'
        ? item.level.toLowerCase().includes(this.character.spellFilters.level.toLowerCase())
        : true
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
