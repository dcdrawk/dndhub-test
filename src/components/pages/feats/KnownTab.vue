<template>
  <section class="dndhub-tab-content">
    <!--BROWSE-->
    <xen-card>
      <div class="xen-table-buttons">
        <xen-button class="xen-theme-blue" :raised="true"
        @click.native="showCustomModal = true">
          Custom Feat
        </xen-button>
      </div>
    </xen-card>
    <div class="xen-data-table bordered hover" v-if="character">
      <table>
        <thead>
          <tr>
            <th class="xen-first-col text-left">
              Name
            </th>
            <th class="add-col text-center">
              Remove
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in character.feats">
            <td class="xen-first-col"
            @click="selectItem(item, index);">
              {{ item.name }}
            </td>
            <td class="add-col text-center">
              <xen-icon-button class="xen-color-grey"
              icon="delete"
              @click.native="removeItem(item, index);">
              </xen-icon-button>
            </td>
          </tr>
          <tr v-if="character.feats ? Object.keys(character.feats).length === 0 : true">
            <td colspan="2" class="text-center">
              No Feats Found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <xen-dialog
      :show="showModal"
      :title="modalTitle"
      @hide="showModal = false; cancelEdit; edit = false;"
      :fullscreen="true"
      :medium="true"
      :back="true"
      :primary="true">
        <div class="dialog-description" v-if="selectedItem">
          <xen-input label="Name"
          class="xen-color-primary"
          name="selected_feat_name"
          :value="selectedItem.name"
          v-validate="'required'"
          data-vv-value-path="dataValue"
          :error="errors.first('selected_feat_name')"
          :disabled="!edit"
          @input="$set(selectedItem, 'name', $event);">
          </xen-input>
          <xen-text-area label="Description"
          class="xen-color-primary"
          name="selected_feat_description"
          :value="selectedItem.description"
          :disabled="!edit"
          @input="$set(selectedItem, 'description', $event);">
          </xen-text-area>
        </div>
        <div slot="actions">
          <div v-if="!edit">
            <xen-button @click.native="$bus.$emit('back')" class="xen-color-black">
              Close
            </xen-button>
            <xen-button @click.native="editItem(selectedItem)" class="xen-theme-blue" :raised="true">
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
      </xen-dialog>
    </div>
    <!-- New Item Dialog -->
    <xen-dialog
    :show="showCustomModal"
    title="Custom Feat"
    @hide="showCustomModal = false;"
    :fullscreen="true"
    :medium="true"
    :back="true"
    :primary="true">
      <!--Custom Input!-->
      <div class="custom-item">

        <xen-input label="Name"
        class="xen-color-primary"
        name="custom_feat_name"
        :value="customItem.name"
        v-validate="'required'"
        data-vv-value-path="dataValue"
        :error="errors.first('custom_feat_name')"
        @input="$set(customItem, 'name', $event);">
        </xen-input>

        <xen-text-area label="Description"
        class="xen-color-primary"
        name="custom_feat_description"
        :value="customItem.description"
        @input="$set(customItem, 'description', $event);">
        </xen-text-area>
      </div>
      <div slot="actions">
        <div>
          <xen-button @click.native="$bus.$emit('back')" class="xen-color-primary">
            Close
          </xen-button>
          <xen-button @click.native="addCustomItem();" class="xen-theme-primary">
            Save
          </xen-button>
        </div>
      </div>
    </xen-dialog>
  </section>
</template>

<script>
export default {
  // Name
  name: 'known-feats-tab',

  // Data
  data () {
    return {
      customItem: {},
      field: 'feats',
      selectedItem: undefined,
      selectedItemId: undefined,
      showModal: false,
      showCustomModal: false,
      modalTitle: undefined,
      edit: false,
      editCopy: undefined
    }
  },

  // Methods
  methods: {
    async addCustomItem () {
      try {
        await this.$validator.validateAll()
      } catch (error) {
        console.error(error)
      }
      this.$bus.$emit('push_item', {
        key: this.field,
        value: this.customItem
      })
      this.$bus.$emit('toast', `${this.customItem.name} Added`)
      this.$nextTick(() => {
        this.$bus.$emit('back')
        this.customItem = {}
      })
    },

    selectItem (item, id) {
      this.selectedItem = Object.assign({}, item)
      this.selectedItemId = id
      this.modalTitle = item.name
      this.$nextTick(() => {
        this.showModal = true
      })
    },

    editItem (item) {
      this.editCopy = Object.assign({}, item)
      this.edit = true
    },

    cancelEdit () {
      this.selectedItem = this.editCopy
      this.editCopy = undefined
      this.edit = false
    },

    async updateItem () {
      try {
        await this.$validator.validateAll()
        this.modalTitle = this.selectedItem.name
        this.$bus.$emit('update_item', {
          key: this.field,
          id: this.selectedItemId,
          value: this.selectedItem
        })
        this.editCopy = this.selectedItem
        this.edit = false
      } catch (error) {
        console.error(error)
      }
    },

    removeItem (item, id) {
      this.$bus.$emit('remove_item', {
        key: this.field,
        id: id
      })
      this.$bus.$emit('toast', `${item.name} Removed`)
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
.custom-item {
  padding-top: 16px;
}
</style>
