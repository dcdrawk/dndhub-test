<template>
  <section class="dndhub-tab-content">
    <!--BROWSE-->
    <xen-card>
      <div class="xen-table-buttons">

      <!--<xen-card-content>-->
        <xen-button class="xen-theme-blue" :raised="true"
        @click.native="showCustomModal = true">
          Custom Feat
        </xen-button>
      <!--</xen-card-content>-->
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
            @click="selectItem(item);">
              {{ item.name }}
            </td>
            <td class="add-col text-center">
              <xen-icon-button class="xen-color-grey"
              icon="delete"
              @click.native="removeItem(index);">
              </xen-icon-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--{{ selectdItem }}-->
    <div v-if="selectedItem">
      <xen-dialog
      :show="showModal"
      :title="modalTitle"
      @hide="showModal = false;"
      :fullscreen="true"
      :back="true"
      :primary="true">
        <div class="dialog-description"
        v-html="selectedItem.description">
        </div>
        <div slot="actions">
          <xen-button @click.native="$bus.$emit('back')" class="xen-color-primary">
            Close
          </xen-button>
        </div>
      </xen-dialog>
    </div>
    <!-- New Item Dialog -->
    <xen-dialog
    :show="showCustomModal"
    title="Custom Feat"
    @hide="showCustomModal = false;"
    :fullscreen="true"
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
      <!--<div class="dialog-description"
      v-html="selectedItem.description">
      </div>-->
      <div slot="actions">
        <xen-button @click.native="$bus.$emit('back')" class="xen-color-primary">
          Close
        </xen-button>
        <xen-button @click.native="addCustomItem();" class="xen-theme-primary">
          Save
        </xen-button>
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
      showModal: false,
      showCustomModal: false,
      modalTitle: undefined
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
    },

    selectItem (item) {
      // console.log(item)
      this.selectedItem = item
      this.modalTitle = item.name
      this.$nextTick(() => {
        this.showModal = true
      })
    },

    removeItem (id) {
      this.$bus.$emit('remove_item', {
        key: this.field,
        id: id
      })
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
