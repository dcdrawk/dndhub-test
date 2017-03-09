import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Create the main data store for our app
const store = new Vuex.Store({
  state: {
    user: undefined,
    characters: undefined,
    character: undefined,
    gameData: {}
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
    },

    select_character (state, character) {
      state.character = character
    },

    update_game_data (state, data) {
      Vue.set(state.gameData, data.key, data.value)
    }
  }
})

export default store
