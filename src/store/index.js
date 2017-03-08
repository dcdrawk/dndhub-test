import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Create the main data store for our app
const store = new Vuex.Store({
  state: {
    user: undefined,
    characters: undefined
  },
  mutations: {
    login (state, user) {
      state.user = user
    },

    logout (state, user) {
      state.user = undefined
    },

    update_characters (state, characters) {
      state.characters = characters
    }
  }
})

export default store
