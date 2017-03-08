<template>
  <div id="app">
    <p>Test</p>
    <router-view></router-view>
    <!--<xen-toast :text="toastMsg" :toggle="showToast" @hide="showToast = false"></xen-toast>-->
  </div>
</template>

<script>
// import XenToast from './components/xen-components/toast'

export default {
  name: 'app',

  components: {
    // XenToast
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

    setTimeout(() => {
      this.showToast = true
    }, 1000)
  },

  methods: {
    auth () {
      this.$firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          this.$store.commit('login', user)
        } else {
          // No user is signed in.
          this.$store.commit('logout', user)
        }
      })
    }
  }
}
</script>

<style lang="scss">
*, *:before, *:after {
  box-sizing: border-box;
}
// @import './styles/core';

// body {
//   font-family: 'Roboto', Arial, sans-serif;
//   font-size: 14px;
//   background-color: #fafafa;
//   margin: 0;
//   padding: 0;
// }
</style>
