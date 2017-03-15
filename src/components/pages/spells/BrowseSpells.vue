<template>
  <section>
    <spell-filters :filter="spellFilters"
    :expand="showFilters"
    @toggle="showFilters = $event"
    @search="spellFilters.search = $event"
    @clear-search="spellFilters.search = undefined"
    @filter-class="spellFilters.class = $event"
    @filter-school="spellFilters.school = $event"
    @filter-level="spellFilters.level = $event"
    @filter-limit="spellFilters.limit = $event">
    </spell-filters>
    <!--{{ items }}-->
    <div v-if="character"
    class="xen-data-table bordered striped"
    :class="{'show-filters': showFilters}">
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
          <!--<tr v-for="(item, index) in items"
          v-if="index >= spellFilters.limit * (page - 1) &&
          index < spellFilters.limit * page">-->
          <tr v-for="(item, index) in paginatedItems">
            <td class="xen-first-col"
            @click="selectItem(item);">
              <div>{{ item.name }}</div>
              <div class="secondary-text">{{ item.level }} {{ item.school }}</div>
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

    <dnd-pagination v-if="character"
    :page="page"
    :total="Math.ceil(total / spellFilters.limit)"
    @input="spellFilters.page = $event">

    </dnd-pagination>

    <!-- Selected Item Dialog -->
    <div>
      <item-dialog class="dnd-spell-dialog"
      :show="showDialog"
      :item="selectedItem"
      :title="dialogTitle"
      type="add"
      :edit="false"
      field="weapons"
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
      spellFilters: {
        search: undefined,
        class: 'All',
        school: 'All',
        level: 'All',
        limit: 20,
        page: 1
      },
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
    }
  },

  // Computed
  computed: {

    page () {
      return this.spellFilters.page <= Math.ceil(this.total / this.spellFilters.limit)
      ? this.spellFilters.page
      : Math.ceil(this.total / this.spellFilters.limit)
    },

    total () {
      return this.items.length
    },

    items () {
      return this.$store.state.gameData[this.field]
      .sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      }).filter(item => {
        return this.spellFilters.class && this.spellFilters.class !== 'All'
        ? item.class.toLowerCase().includes(this.spellFilters.class.toLowerCase())
        : true
      }).filter(item => {
        return this.spellFilters.school && this.spellFilters.school !== 'All'
        ? item.school.toLowerCase().includes(this.spellFilters.school.toLowerCase())
        : true
      }).filter(item => {
        return this.spellFilters.search
        ? item.name.toLowerCase().includes(this.spellFilters.search.toLowerCase())
        : true
      }).filter(item => {
        return this.spellFilters.level && this.spellFilters.level !== 'All'
        ? item.level.toLowerCase().includes(this.spellFilters.level.toLowerCase())
        : true
      })
    },

    paginatedItems () {
      return this.items.slice(this.spellFilters.limit * (this.spellFilters.page - 1), this.spellFilters.limit * this.spellFilters.page)
    },

    character () {
      return this.$store.state.character
    }
  }
}
</script>

<style scoped lang="scss">
</style>
