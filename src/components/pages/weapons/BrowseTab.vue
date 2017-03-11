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
            <th class="xen-first-col text-left">
              Damage
            </th>
            <th class="add-col text-center">
              Add
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in weapons">
            <td class="xen-first-col"
            @click="selectItem(item);">
              {{ item.name }}
            </td>
            <td class="xen-first-col"
            @click="selectItem(item);">
              {{ item.damage }}
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
    <!-- Selected Item Dialog -->
    <div v-if="selectedItem">
      <xen-dialog
      :show="showModal"
      :title="modalTitle"
      :medium="true"
      @hide="showModal = false;"
      :fullscreen="true"
      :back="true"
      :primary="true">
        <div class="dialog-description" v-if="selectedItem">
          <xen-input label="Name"
          class="xen-color-primary"
          :value="selectedItem.name"
          :disabled="true">
          </xen-input>

          <xen-input label="Damage"
          class="xen-color-primary"
          :value="selectedItem.damage"
          :disabled="true">
          </xen-input>

          <xen-input label="Damage Type"
          class="xen-color-primary"
          :value="selectedItem.damageType"
          :disabled="true">
          </xen-input>

          <xen-input label="Weapon Type"
          class="xen-color-primary"
          :value="selectedItem.weaponType"
          :disabled="true">
          </xen-input>

          <xen-input label="Weight"
          class="xen-color-primary"
          :value="selectedItem.weight"
          :disabled="true">
          </xen-input>

          <xen-input label="Cost"
          class="xen-color-primary"
          :value="selectedItem.cost"
          :disabled="true">
          </xen-input>

          <xen-chips
          :chips="selectedItem.properties" :read-only="true">
          </xen-chips>

          <!--<xen-text-area label="Notes"
          class="xen-color-primary"
          name="selected_feat_description"
          :value="selectedItem.notes"
          :disabled="true">-->

          </xen-text-area>
        </div>
        <div slot="actions">
          <xen-button @click.native="$bus.$emit('back')">
            Close
          </xen-button>
          <xen-button @click.native="addItem(selectedItem); $bus.$emit('back');" class="xen-theme-blue" :raised="true">
            Add
          </xen-button>
        </div>
      </xen-dialog>
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
      field: 'weapons',
      selectedItem: undefined,
      showModal: false,
      modalTitle: undefined
    }
  },

  // Methods
  methods: {
    selectItem (item) {
      console.log(item)
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
    weapons () {
      return this.$store.state.gameData.weapons
      .sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
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
