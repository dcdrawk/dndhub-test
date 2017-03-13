<template>
  <div class="dnd-pagination">
    <!--pagination-->
    <span class="page">
      <strong>{{ page }} / {{ total }}</strong>
    </span>
    <xen-icon-button class="icon"
    icon="keyboard_arrow_left"
    :square="true"
    @click.native="$emit('input', page > 1 ? page - 1 : page)">
    </xen-icon-button>
    <xen-icon-button class="icon"
    icon="keyboard_arrow_right"
    :square="true"
    @click.native="$emit('input', page < total ? page + 1 : page)">
    </xen-icon-button>
  </div>
</template>

<script>
export default {
  // Name
  name: 'pagination',

  props: [
    'page',
    'total'
    // 'item',
    // 'field',
    // 'edit',
    // 'type' // 'edit', 'custom', 'add'
  ],

  // Data
  // data () {
    // return {
    //   modalTitle: undefined,
    //   editCopy: undefined
    // }
  // },

  // Methods
  methods: {
    // addItem (item) {
    //   this.$bus.$emit('push_item', {
    //     key: this.field,
    //     value: item
    //   })
    //   this.$bus.$emit('toast', `${item.name} Added`)
    //   this.$emit('add')
    // },

    // async addCustomItem () {
    //   try {
    //     await this.$validator.validateAll()
    //     this.$bus.$emit('push_item', {
    //       key: this.field,
    //       value: this.item
    //     })
    //     this.$bus.$emit('toast', `${this.item.name} Added`)
    //     this.$nextTick(() => {
    //       this.$bus.$emit('back')
    //     })
    //   } catch (error) {
    //     console.warn(error)
    //   }
    // },

    // editItem () {
    //   this.editCopy = Object.assign({}, this.item)
    //   this.$emit('edit')
    // },

    // cancelEdit () {
    //   this.$emit('cancel', this.editCopy)
    //   this.editCopy = undefined
    // },

    // async updateItem () {
    //   try {
    //     await this.$validator.validateAll()
    //     this.modalTitle = this.item.name
    //     this.$bus.$emit('update_item', {
    //       key: this.field,
    //       id: this.item.id,
    //       value: this.item
    //     })
    //     this.editCopy = this.item
    //     this.$emit('update')
    //   } catch (error) {
    //     console.warn(error)
    //   }
    // }
  },

  // Computed
  computed: {
    // character () {
    //   return this.$store.state.character
    // },

    // weapons () {
    //   let weapons = []
    //   for (var i in this.character.weapons) {
    //     let weapon = this.character.weapons[i]
    //     weapon.id = i
    //     weapons.push(weapon)
    //   }
    //   return weapons.sort((a, b) => {
    //     if (a.name < b.name) return -1
    //     if (a.name > b.name) return 1
    //     return 0
    //   })
    // }
  }
}
</script>

<style scoped lang="scss">
.dnd-pagination {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 40px;
  padding: 0px;
  background-color: #fafafa;
  z-index: 5;
  border-top: 1px solid rgba(0, 0, 0, 0.24);
  text-align: right;
}
.icon {
  margin: 0;
}
.page {
  margin-right: 8px;
}
</style>
