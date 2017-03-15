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
  ]
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
  width: 100%;
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
