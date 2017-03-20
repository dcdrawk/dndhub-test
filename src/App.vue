<template>
  <div id="app">
    <sidenav></sidenav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <xen-toast :text="toastMsg"
    :show="showToast"
    @queue="showToast = false">
    </xen-toast>
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
      let update = {}
      update[data.key] = data.value
      this.$store.commit('update_character', data)
      this.characterRef.update(update)
    })

    this.$bus.$on('push_item', (data) => {
      // console.log(data)
      const ref = this.$firebase.database().ref(`${this.refPath}/${data.key}`)
      ref.push(data.value)
      .then(snapshot => {
        // console.log(snapshot.key)
        this.$store.commit('push_item', {
          prop: data.key,
          key: snapshot.key,
          value: data.value
        })
      })
    })

    this.$bus.$on('update_item', (data) => {
      // console.log(data)
      this.$firebase.database().ref(`${this.refPath}/${data.key}/${data.id}`)
      .update(data.value).then(() => {
        this.$store.commit('push_item', {
          prop: data.key,
          key: data.id,
          value: data.value
        })
      })
    })

    this.$bus.$on('remove_item', (data) => {
      // console.log(data)
      this.$store.commit('remove_item', {
        prop: data.key,
        id: data.id
      })
      // console.log(`${this.refPath}/${data.key}/${data.id}`)
      this.$firebase.database().ref(`${this.refPath}/${data.key}/${data.id}`)
      .remove()
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
      // console.log(this.refPath)
      this.characterRef = this.$firebase.database()
      .ref(`/characters/${this.user.uid}/${characterId}`)
      this.characterRef.once('value', (snapshot) => {
        let character = Object.assign({}, snapshot.val())
        character.id = characterId
        // console.log(character)
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
