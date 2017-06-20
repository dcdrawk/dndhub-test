<template>
  <xen-card class="dnd-filters">
    <xen-card-content class="xen-table-filters">
      <xen-button :raised="true" class="new-button xen-theme-blue"
      @click.native="$emit('new')">
        New
      </xen-button>
      <div class="search-filter">
        <xen-input placeholder="Search Spells"
        class="xen-color-primary"
        :value="filter.search"
        :debounce="300"
        @input="$emit('search', $event)">
        </xen-input>
        <i v-if="filter.search" class="material-icons clear-input"
        @click="$emit('clear-search')">close</i>
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
            :options="classOptions"
            @input="$emit('filter-class', $event)"
            :value="filter.class">
            </xen-select>

          </div>

          <div class="col-xs-6">

            <xen-select label="School"
            class="xen-no-margin"
            :options="schoolOptions"
            @input="$emit('filter-school', $event)"
            :value="filter.school">
            </xen-select>

          </div>
        </div>
        <div class="row xen-color-primary">
          <div class="col-xs-6">

            <xen-select label="Level"
            :options="levelOptions"
            @input="$emit('filter-level', $event)"
            :value="filter.level">
            </xen-select>

          </div>

          <div class="col-xs-6">

            <xen-select label="Per Page"
            :options="limitOptions"
            @input="$emit('filter-limit', $event)"
            :value="filter.limit">
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
.new-button {
  margin: 0 16px 0 0;
  display: block;
  position: relative;
  height: 100%;
  width: 68px;
}
.search-filter {
  margin-top: 4px;
}
</style>
