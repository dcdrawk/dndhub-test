<template>
  <xen-dialog
  :show="show"
  :title="title"
  @hide="$emit('hide')"
  :fullscreen="true"
  :medium="true"
  :back="true"
  :primary="true">
    <div class="item-dialog-container">
      <slot></slot>
    </div>

    </div>
    <div slot="actions" v-if="type === 'edit'">
      <div v-if="!edit">
        <xen-button @click.native="$bus.$emit('back')" class="xen-color-black">
          Close
        </xen-button>
        <xen-button @click.native="editItem()" class="xen-theme-blue" :raised="true">
          Edit
        </xen-button>
      </div>
      <div v-if="edit">
        <xen-button @click.native="cancelEdit();" class="xen-color-primary">
          Cancel
        </xen-button>
        <xen-button @click.native="updateItem();" class="xen-theme-primary">
          Save
        </xen-button>
      </div>
    </div>
    <div slot="actions" v-if="type === 'custom'">
      <div>
        <xen-button @click.native="$bus.$emit('back')" class="xen-color-primary">
          Cancel
        </xen-button>
        <xen-button @click.native="addCustomItem();" class="xen-theme-primary">
          Save
        </xen-button>
      </div>
    </div>
    <div slot="actions" v-if="type === 'add'">
      <div>
        <xen-button @click.native="$bus.$emit('back')" class="xen-color-primary">
          Cancel
        </xen-button>
        <xen-button @click.native="addItem(item);" class="xen-theme-primary">
          Add
        </xen-button>
      </div>
    </div>
  </xen-dialog>
</template>

<script>
export default {
  // Name
  name: 'item-dialog',

  props: [
    'show',
    'title',
    'item',
    'field',
    'edit',
    'type' // 'edit', 'custom', 'add'
  ],

  // Data
  data () {
    return {
      modalTitle: undefined,
      editCopy: undefined
    }
  },

  // Methods
  methods: {
    addItem (item) {
      console.log(item)
      console.log(this.field)
      this.$bus.$emit('push_item', {
        key: this.field,
        value: item
      })
      this.$bus.$emit('toast', `${item.name} Added`)
      this.$emit('add')
    },

    async addCustomItem () {
      try {
        await this.$validator.validateAll()
        this.$bus.$emit('push_item', {
          key: this.field,
          value: this.item
        })
        this.$bus.$emit('toast', `${this.item.name} Added`)
        this.$nextTick(() => {
          this.$bus.$emit('back')
        })
      } catch (error) {
        console.warn(error)
      }
    },

    editItem () {
      this.editCopy = Object.assign({}, this.item)
      this.$emit('edit')
    },

    cancelEdit () {
      this.$emit('cancel', this.editCopy)
      this.editCopy = undefined
    },

    async updateItem () {
      try {
        await this.$validator.validateAll()
        this.modalTitle = this.item.name
        this.$bus.$emit('update_item', {
          key: this.field,
          id: this.item.id,
          value: this.item
        })
        this.editCopy = this.item
        this.$emit('update')
      } catch (error) {
        console.warn(error)
      }
    }
  },

  // Computed
  computed: {
    character () {
      return this.$store.state.character
    },

    weapons () {
      let weapons = []
      for (var i in this.character.weapons) {
        let weapon = this.character.weapons[i]
        weapon.id = i
        weapons.push(weapon)
      }
      return weapons.sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
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
