<template>
  <section class="dndhub-tab-content">
    <!--BROWSE-->
    <div class="xen-data-table bordered hover" v-if="character">
      <table>
        <thead>
          <tr>
            <th class="xen-first-col text-left">
              Name
            </th>
            <th class="add-col text-center">
              Add
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in feats">
            <td class="xen-first-col"
            @click="selectItem(item);">
              {{ item.name }}
            </td>
            <td class="add-col text-center">
              <xen-icon-button class="xen-theme-blue"
              :raised="true" icon="add"
              @click.native="addItem(item);">
              </xen-icon-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  // Name
  name: 'browse-feats-tab',

  // Data
  data () {
    return {
      field: 'feats',
      selectedItem: undefined,
      showModal: false,
      modalTitle: undefined
    }
  },

  // Methods
  methods: {
    selectItem (item) {
      this.selectedItem = item
      this.modalTitle = item.name
      this.$nextTick(() => {
        this.showModal = true
      })
    },

    addItem (item) {
      this.$bus.$emit('push_item', {
        key: this.field,
        value: item
      })
      this.$bus.$emit('toast', `${item.name} Added`)
    }
  },

  // Computed
  computed: {
    feats () {
      return this.$store.state.gameData.feats
    },

    character () {
      return this.$store.state.character
    }
  }
}
</script>

<style scoped lang="scss">
</style>
