<template>
  <section>

  </section>
</template>

<script>
// import ItemDialog from '../../dialogs/ItemDialog'
// import DndPagination from '../../pagination/Pagination'
// import SpellInputs from './SpellInputs'
// import SpellFilters from './SpellFilters'

export default {
  // Name
  name: 'browse-feats-tab',

  components: {
    // ItemDialog,
    // SpellInputs,
    // SpellFilters,
    // DndPagination
  },

  // Data
  data () {
    return {
      // field: 'spells',
      // spellFilters: {
      //   search: undefined,
      //   class: 'All',
      //   school: 'All',
      //   level: 'All',
      //   limit: 20,
      //   page: 1
      // },
      // showFilters: false,
      // selectedItem: undefined,
      // showDialog: false,
      // dialogTitle: undefined
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

    // page () {
    //   return this.spellFilters.page <= Math.ceil(this.total / this.spellFilters.limit)
    //   ? this.spellFilters.page
    //   : Math.ceil(this.total / this.spellFilters.limit)
    // },

    // total () {
    //   return this.$store.state.gameData[this.field].length
    // },

    // items () {
    //   return this.$store.state.gameData[this.field]
    //   .sort((a, b) => {
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
    //   }).slice(this.spellFilters.limit * (this.spellFilters.page - 1), this.spellFilters.limit * this.spellFilters.page)
    // },

    // character () {
    //   return this.$store.state.character
    // }
  }
}
</script>

<style scoped lang="scss">
</style>
