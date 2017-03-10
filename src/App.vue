<template>
  <div id="app">
    <sidenav></sidenav>
    <router-view></router-view>
    <xen-toast :text="toastMsg" :toggle="showToast" @hide="showToast = false"></xen-toast>
  </div>
</template>

<script>
import Sidenav from './components/layout/Sidenav'
import XenToast from './components/xen-components/toast'
import GameData from './game-data'

export default {
  name: 'app',

  components: {
    Sidenav,
    XenToast
  },

  data () {
    return {
      toastMsg: undefined,
      showToast: false,
      characterRef: undefined
    }
  },

  mounted () {
    this.initAuth()

    GameData.importData(this)
    this.$bus.$on('toast', (text) => {
      this.$nextTick(() => {
        this.toastMsg = text
        this.showToast = true
      })
    })

    this.$bus.$on('back', () => {
      window.history.back()
    })

    this.$bus.$on('set_character', (characterId) => {
      this.getCharacter(characterId)
    })

    this.$bus.$on('update_character', (data) => {
      // if (data.path) {
        // this.$store.commit('update_character_path', data)
        // this.$firebase.database().ref(`${this.refPath}/{data.path}`).set(data.value)
      // } else {
      let update = {}
      update[data.key] = data.value
      this.$store.commit('update_character', data)
      // console.log(update)
      this.characterRef.update(update)
      // }
    })
  },

  methods: {
    initAuth () {
      this.$firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          this.$store.commit('login', user)
        } else {
          // No user is signed in.
          this.$store.commit('logout', user)
        }
      })
    },

    getCharacter (characterId) {
      if (this.characterRef) {
        this.characterRef.off()
      }
      this.characterRef = this.$firebase.database().ref(this.refPath)
      this.characterRef.once('value', (snapshot) => {
        let character = Object.assign({}, snapshot.val())
        character.id = characterId
        this.$store.commit('set_character', character)
      })
    }
  },

  computed: {
    user () {
      return this.$store.state.user
    },

    character () {
      return this.$store.state.character
    },

    characterId () {
      return this.$store.state.characterId
    },

    refPath () {
      if (this.user && this.characterId) {
        return `/characters/${this.user.uid}/${this.characterId}`
      }
    }
  },

  watch: {
    user (value) {
      if (value && this.characterId) {
        this.getCharacter(this.characterId)
      }
    }
  }
}
</script>

<style lang="scss">
*, *:before, *:after {
  box-sizing: border-box;
}
@import './styles/core';

body {
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  background-color: #fafafa;
  margin: 0;
  padding: 0;
}
</style>
