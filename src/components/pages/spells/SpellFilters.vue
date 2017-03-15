<template>
  <xen-card class="dnd-filters">
    <xen-card-content class="xen-table-filters">
      <div class="search-filter">
        <xen-input placeholder="Search Spells"
        class="xen-color-primary"
        :value="filter.search"
        :debounce="300"
        @input="updateFilter('search', $event)">
        </xen-input>
        <i v-if="filter.search" class="material-icons clear-input"
        @click="updateFilter('search', '')">close</i>
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
        <div class="row xen-color-primary">
          <div class="col-xs-6">

            <xen-select label="Class"
            class="xen-no-margin"
            :value="filter.class || 'All'"
            :options="classOptions"
            @input="updateFilter('class', $event)">
            </xen-select>

          </div>

          <div class="col-xs-6">

            <xen-select label="School"
            class="xen-no-margin"
            :value="filter.school || 'All'"
            :options="schoolOptions"
            @input="updateFilter('school', $event)">
            </xen-select>

          </div>
        </div>
        <div class="row xen-color-primary">
          <div class="col-xs-6">

            <xen-select label="Level"
            :value="filter.level || 'All'"
            :options="levelOptions"
            @input="updateFilter('level', $event)">
            </xen-select>

          </div>

          <div class="col-xs-6">

            <xen-select label="Per Page"
            :value="filter.limit || 20"
            :options="limitOptions"
            @input="updateFilter('limit', $event)">
            </xen-select>

          </div>
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
    'search-filter',
    'class-filter',
    'school-filter',
    'level-filter',
    'limit-filter',
    'expand'
  ],

  components: {
    // ItemDialog,
    // SpellInputs
  },

  // Data
  data () {
    return {
      classOptions: [
        'All',
        'Bard',
        'Cleric',
        'Druid',
        'Paladin',
        'Sorcerer',
        'Ranger',
        'Ritual Caster',
        'Warlock',
        'Wizard'
      ],
      schoolOptions: [
        'All',
        'Abjuration',
        'Conjuration',
        'Divination',
        'Enchantment',
        'Evocation',
        'Illusion',
        'Necromancy',
        'Transmutation'
      ],
      levelOptions: ['All', 'Cantrip', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      limitOptions: [20, 50, 100]
    //   field: 'spells',
    //   filter: undefined,
    //   selectedItem: undefined,
    //   showDialog: false,
    //   dialogTitle: undefined
    }
  },

  created () {
    if (this.character) {
      this.checkFilters()
    }
  },

  // Methods
  methods: {
    checkFilters () {
      if (this.character.spellFilters) {
        return
      } else {
        this.$bus.$emit('update_character', {key: 'spellFilters', value: {}})
      }
    },

    updateFilter (key, value) {
      if (!this.character.spellFilters) {
        this.$set(this.character, 'spellFilters', {})
      }
      this.$set(this.character.spellFilters, key, value)
      this.$emit('update-filter', {key: key, value: value})

      this.$bus.$emit('update_character', {key: 'spellFilters', value: this.character.spellFilters})
      // this.$set(this.character.spellFilters, event.key, event.value)
    }
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

    character () {
      return this.$store.state.character
    }
  },

  watch: {
    character (value) {
      if (value) {
        this.checkFilters()
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
