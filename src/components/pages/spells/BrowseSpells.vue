<template>
  <section v-if="character">
    <spell-filters v-if="character.spellFilters"
    :filter="character.spellFilters"
    :expand="showFilters"
    @toggle="showFilters = $event">
    </spell-filters>
    <div v-if="character"
    class="xen-data-table bordered striped"
    :class="{'show-filters': showFilters}">
      <table>
        <thead>
          <tr>
            <th class="xen-first-col text-left">
              Spell
            </th>
            <th class="add-col text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items"
          v-if="index >= character.spellFilters.limit * (page - 1) &&
          index < character.spellFilters.limit * page">
            <td class="xen-first-col"
            @click="selectItem(item);">
              <div>{{ item.name }}</div>
              <div class="secondary-text">{{ item.level }} {{ item.school }}</div>
            </td>
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

    <dnd-pagination v-if="character"
    :page="page"
    :total="Math.ceil(items.length / character.spellFilters.limit)"
    @input="page = $event">

    </dnd-pagination>

    <!-- Selected Item Dialog -->
    <div>
      <item-dialog class="dnd-spell-dialog"
      :show="showDialog"
      :item="selectedItem"
      :title="dialogTitle"
      type="add"
      :edit="false"
      :field="field"
      @hide="showDialog = false"
      @add="showDialog = false">
        <spell-inputs
        :item="selectedItem"
        @input="$set(selectedItem, $event.prop, $event.value)">
        </spell-inputs>
      </item-dialog>
    </div>

  </section>
</template>

<script>
import ItemDialog from '../../dialogs/ItemDialog'
import DndPagination from '../../pagination/Pagination'
import SpellInputs from './SpellInputs'
import SpellFilters from './SpellFilters'

export default {
  // Name
  name: 'browse-feats-tab',

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
      // spellFilters: {
      //   search: undefined,
      //   class: 'All',
      //   school: 'All',
      //   level: 'All',
      //   limit: 20,
      //   page: 1
      // },
      page: 1,
      showFilters: false,
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

    // page () {
      // if (this.character.spellFilters.page) {
      //   return this.character.spellFilters.page <= Math.ceil(this.items.length / this.character.spellFilters.limit)
      //   ? this.character.spellFilters.page
      //   : Math.ceil(this.items.length / this.character.spellFilters.limit)
      // } else {
      //   return 1
      // }
    // },

    items () {
      this.checkFilters()
      return this.$store.state.gameData[this.field]
      .sort((a, b) => {
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
    },

    character () {
      return this.$store.state.character
    }
  }
}
</script>

<style scoped lang="scss">
</style>
