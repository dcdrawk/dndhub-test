<template>
  <section class="dndhub-tab-content">
    <xen-card>
      <div class="xen-table-buttons">
        <xen-button class="xen-theme-blue" :raised="true"
        @click.native="showCustomModal = true">
          New Weapon
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
            <th class="text-left">
              Damage
            </th>
            <th class="add-col text-center">
              Remove
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in weapons">
            <td class="xen-first-col"
            @click="selectItem(item, index);">
              {{ item.name }}
            </td>
            <td class="text-left"
            @click="selectItem(item);">
              {{ item.damage }}
            </td>
            <td class="add-col text-center">
              <xen-icon-button class="xen-color-grey"
              icon="delete"
              @click.native="removeItem(item, item.id);">
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
          :value="selectedItem.name"
          @input="$set(selectedItem, 'name', $event)"
          name="selected_weapon_name"
          v-validate="'required'"
          data-vv-value-path="dataValue"
          :error="errors.first('selected_weapon_name')"
          :disabled="!edit">
          </xen-input>

          <xen-input label="Damage"
          class="xen-color-primary"
          :value="selectedItem.damage"
          @input="$set(selectedItem, 'damage', $event)"
          :disabled="!edit">
          </xen-input>

          <xen-input label="Damage Type"
          class="xen-color-primary"
          :value="selectedItem.damageType"
          @input="$set(selectedItem, 'damageType', $event)"
          :disabled="!edit">
          </xen-input>

          <xen-input label="Weapon Type"
          class="xen-color-primary"
          :value="selectedItem.weaponType"
          @input="$set(selectedItem, 'weaponType', $event)"
          :disabled="!edit">
          </xen-input>

          <xen-input label="Weight"
          class="xen-color-primary"
          :value="selectedItem.weight"
          @input="$set(selectedItem, 'weight', $event)"
          :disabled="!edit">
          </xen-input>

          <xen-input label="Cost"
          class="xen-color-primary"
          :value="selectedItem.cost"
          @input="$set(selectedItem, 'cost', $event)"
          :disabled="!edit">
          </xen-input>

          <xen-chips class="xen-color-primary"
          :chips="selectedItem.properties"
          label="Properties"
          @input="$set(selectedItem, 'properties', $event)"
          :read-only="!edit">
          </xen-chips>

          <xen-text-area label="Notes"
          class="xen-color-primary"
          :value="selectedItem.notes"
          @input="$set(selectedItem, 'notes', $event)"
          :disabled="!edit">
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
    title="New Weapon"
    @hide="showCustomModal = false;"
    :fullscreen="true"
    :medium="true"
    :back="true"
    :primary="true">
      <!--Custom Input!-->
      <div class="custom-item">

        <div class="dialog-description" v-if="customItem">
          <xen-input label="Name"
          class="xen-color-primary"
          :value="customItem.name"
          @input="$set(customItem, 'name', $event)"
          name="custom_weapon_name"
          v-validate="'required'"
          data-vv-value-path="dataValue"
          :error="errors.first('custom_weapon_name')">
          </xen-input>

          <xen-input label="Damage"
          class="xen-color-primary"
          :value="customItem.damage"
          @input="$set(customItem, 'damage', $event)">
          </xen-input>

          <xen-input label="Damage Type"
          class="xen-color-primary"
          :value="customItem.damageType"
          @input="$set(customItem, 'damageType', $event)">
          </xen-input>

          <xen-input label="Weapon Type"
          class="xen-color-primary"
          :value="customItem.weaponType"
          @input="$set(customItem, 'weaponType', $event)">
          </xen-input>

          <xen-input label="Weight"
          class="xen-color-primary"
          :value="customItem.weight"
          @input="$set(customItem, 'weight', $event)">
          </xen-input>

          <xen-input label="Cost"
          class="xen-color-primary"
          :value="customItem.cost"
          @input="$set(customItem, 'cost', $event)">
          </xen-input>

          <xen-chips class="xen-color-primary"
          :chips="customItem.properties"
          label="Properties"
          @input="$set(customItem, 'properties', $event)"
          :read-only="false">
          </xen-chips>

          <xen-text-area label="Notes"
          class="xen-color-primary"
          :value="customItem.notes"
          @input="$set(customItem, 'notes', $event)">
          </xen-text-area>
        </div>
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
      field: 'weapons',
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
        this.$bus.$emit('push_item', {
          key: this.field,
          value: this.customItem
        })
        this.$bus.$emit('toast', `${this.customItem.name} Added`)
        this.$nextTick(() => {
          this.$bus.$emit('back')
          this.customItem = {}
        })
      } catch (error) {
        console.warn(error)
      }
    },

    selectItem (item, id) {
      this.selectedItem = Object.assign({}, item)
      this.selectedItemId = item.id
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
        console.warn(error)
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
