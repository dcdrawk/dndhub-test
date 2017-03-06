<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    console.log(this)
  }
}
</script>

<style lang="scss">
@import './styles/core';

body {
  font-family: 'Roboto', Arial, sans-serif;
}
</style>
