<template>
  <xen-card class="dnd-filters">
    <xen-card-content class="xen-table-filters">
      <div class="search-filter">
        <xen-input placeholder="Search Spells"
        class="xen-color-primary"
        :value="filter"
        :debounce="500"
        @input="$emit('search', $event)">
        </xen-input>
        <i v-if="filter" class="material-icons clear-input"
        @click="filter = undefined">close</i>
      </div>
      <div class="expand-button">
        <xen-icon-button icon="keyboard_arrow_down"
        @click.native="$emit('toggle', !expand);"
        :center="true">
        </xen-icon-button>
      </div>
    </xen-card-content>
    <transition name="filter-toggle">
      <xen-card-content v-if="expand" class="expand-filters">
        <div class="search-filter">
          <xen-input placeholder="Search Spells"
          class="xen-color-primary"
          :value="filter"
          :debounce="500"
          @input="$emit('search', $event)">
          </xen-input>
          <i v-if="filter" class="material-icons clear-input"
          @click="filter = undefined">close</i>
        </div>
      </xen-card-content>
    </transition>
  </xen-card>
</template>

<script>
// import ItemDialog from '../../dialogs/ItemDialog'
// import SpellInputs from './SpellInputs'

export default {
  // Name
  name: 'spell-filters',

  props: [
    'filter',
    'expand'
  ],

  components: {
    // ItemDialog,
    // SpellInputs
  },

  // Data
  data () {
    return {
    //   field: 'spells',
    //   filter: undefined,
    //   selectedItem: undefined,
    //   showDialog: false,
    //   dialogTitle: undefined
    }
  },

  // Methods
  methods: {
    // addItem (item) {
    //   this.$bus.$emit('push_item', {
    //     key: this.field,
    //     value: item
    //   })
    //   this.$bus.$emit('toast', `${item.name} Added`)
    // },

    // selectItem (item) {
    //   console.log(item)
    //   this.selectedItem = item
    //   this.dialogTitle = item.name
    //   this.$nextTick(() => {
    //     this.showDialog = true
    //   })
    // }
  },

  // Computed
  computed: {
    // items () {
    //   return this.$store.state.gameData[this.field]
    //   .sort((a, b) => {
    //     if (a.name < b.name) return -1
    //     if (a.name > b.name) return 1
    //     return 0
    //   }).filter(item => {
    //     return this.filter
    //     ? item.name.toLowerCase().includes(this.filter.toLowerCase())
    //     : true
    //   })
    // },

    // character () {
    //   return this.$store.state.character
    // }
  }
}
</script>

<style scoped lang="scss">
</style>
