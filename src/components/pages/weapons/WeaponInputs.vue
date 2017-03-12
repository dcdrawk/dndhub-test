<template>
  <div v-if="item" class="xen-color-primary">
    <!-- Name -->
    <xen-input label="Name"
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
    </xen-input>

    <!-- Damage -->
    <xen-input label="Damage"
    :value="item.damage"
    @input="$emit('input', {
      prop: 'damage',
      value: $event
    })"
    :disabled="edit === false">
    </xen-input>

    <!-- Damage Type -->
    <xen-input label="Damage Type"
    :value="item.damageType"
    @input="$emit('input', {
      prop: 'damageType',
      value: $event
    })"
    :disabled="edit === false">
    </xen-input>

    <!-- Damage Type -->
    <xen-input label="Weapon Type"
    :value="item.weaponType"
    @input="$emit('input', {
      prop: 'weaponType',
      value: $event
    })"
    :disabled="edit === false">
    </xen-input>

    <!-- Damage Type -->
    <xen-input label="Weight"
    :value="item.weight"
    @input="$emit('input', {
      prop: 'weight',
      value: $event
    })"
    :disabled="edit === false">
    </xen-input>

    <!-- Cost -->
    <xen-input label="Cost"
    :value="item.cost"
    @input="$emit('input', {
      prop: 'cost',
      value: $event
    })"
    :disabled="edit === false">
    </xen-input>

    <xen-chips label="Properties"
    :chips="item.properties"
    @input="$emit('input', {
      prop: 'properties',
      value: $event
    })"
    :read-only="edit === false">
    </xen-chips>

    <xen-text-area label="Notes"
    :value="item.notes"
    @input="$emit('input', {
      prop: 'notes',
      value: $event
    })"
    :disabled="edit === false">
    </xen-text-area>
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
