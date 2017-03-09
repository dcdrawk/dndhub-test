import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Create the main data store for our app
const store = new Vuex.Store({
  // State
  state: {
    user: undefined,
    characters: undefined,
    characterId: window.localStorage.getItem('characterId'),
    character: undefined,
    gameData: {}
  },

  // Mutations
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

    set_character (state, character) {
      // console.log('state set char')
      if (character) {
        if (character.id) {
          state.characterId = character.id
          window.localStorage.setItem('characterId', character.id)
        }
      } else {
        state.characterId = undefined
        window.localStorage.removeItem('characterId')
      }
      state.character = character
    },

    update_character (state, data) {
      console.log('state update char')
      Vue.set(state.character, data.key, data.value)
      window.localStorage.setItem('character', window.JSON.stringify(state.character))
    },

    update_game_data (state, data) {
      Vue.set(state.gameData, data.key, data.value)
    }
  }
})

export default store
