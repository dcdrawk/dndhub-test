<template>
  <div v-if="item" class="spell-container">
    <div class="spell-info">
      {{ item.name }}
    </div>
    <div class="spell-casting-time">
      {{ item.casting_time }}
    </div>
    <div class="spell-range">
      {{ item.range }}
    </div>
    <div class="spell-components">
      {{ item.components }}
    </div>
    <div class="spell-description">
      {{ item.desc }}
    </div>
    <!-- Name -->
    <!--<xen-input label="Name"
    :value="item.name"
    @input="$emit('input', {
      prop: 'name',
      value: $event
    })"
    name="selected_weapon_name"
    v-validate="'required'"
    data-vv-value-path="dataValue"
    :error="errors.first('selected_weapon_name')"
    :disabled="edit === false">
    </xen-input>-->

    <!-- Armor Class -->
    <!--<xen-input label="Armor Class"
    :value="item.ac"
    @input="$emit('input', {
      prop: 'ac',
      value: $event
    })"
    :disabled="edit === false">
    </xen-input>-->

    <!-- Armor Type -->
    <!--<xen-input label="Armor Type"
    :value="item.armorType"
    @input="$emit('input', {
      prop: 'armorType',
      value: $event
    })"
    :disabled="edit === false">
    </xen-input>-->

    <!-- Cost -->
    <!--<xen-input label="Cost"
    :value="item.cost"
    @input="$emit('input', {
      prop: 'cost',
      value: $event
    })"
    :disabled="edit === false">
    </xen-input>-->

    <!-- Properties -->
    <!--<xen-chips label="Properties"
    :chips="item.properties"
    @input="$emit('input', {
      prop: 'properties',
      value: $event
    })"
    :read-only="edit === false">
    </xen-chips>-->

    <!-- Notes -->
    <!--<xen-text-area label="Notes"
    :value="item.notes"
    @input="$emit('input', {
      prop: 'notes',
      value: $event
    })"
    :disabled="edit === false">
    </xen-text-area>-->
  </div>
</template>

<script>
export default {
  // Name
  name: 'weapon-inputs',

  props: [
    'item',
    'edit'
  ]
}
</script>

<style scoped lang="scss">
</style>
