<template>
  <div id="app">
    <router-view></router-view>
    <xen-toast :text="toastMsg" :toggle="showToast" @hide="showToast = false"></xen-toast>
  </div>
</template>

<script>
import XenToast from './components/xen-components/toast'

export default {
  name: 'app',

  components: {
    XenToast
  },

  data () {
    return {
      toastMsg: 'Test',
      showToast: false
    }
  },

  mounted () {
    this.$bus.$on('toast', (text) => {
      this.$nextTick(() => {
        this.toastMsg = text
        this.showToast = true
      })
    })
    console.log(this)
    setTimeout(() => {
      this.showToast = true
    }, 1000)
  }
}
</script>

<style lang="scss">
@import './styles/core';

body {
  font-family: 'Roboto', Arial, sans-serif;
}
</style>
