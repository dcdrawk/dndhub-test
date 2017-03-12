<template>
  <div v-if="item" class="xen-color-primary">
    <!-- Name -->
    <xen-input label="Name"
    :value="item.name"
    @input="$emit('input', {
      prop: 'name',
      value: $event
    })"
    name="feat_name"
    v-validate="'required'"
    data-vv-value-path="dataValue"
    :error="errors.first('feat_name')"
    :disabled="edit === false">
    </xen-input>

    <!-- Description  -->
    <xen-text-area label="Description"
    :value="item.description"
    @input="$emit('input', {
      prop: 'description',
      value: $event
    })"
    :disabled="edit === false">
    </xen-text-area>
  </div>
</template>

<script>
export default {
  // Name
  name: 'feat-inputs',

  props: [
    'item',
    'edit'
  ]
}
</script>

<style scoped lang="scss">
</style>
