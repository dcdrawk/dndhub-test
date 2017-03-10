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
      Vue.set(state.character, data.key, data.value)
      // window.localStorage.setItem('character', window.JSON.stringify(state.character))
    },

    update_ability_score (state, data) {
      if (state.character.abilityScores) {
        Vue.set(state.character.abilityScores[data.score], data.key, data.value)
      }
      // const path = data.path.split('/')
      // path.forEach((prop) => {

      // })
      // Vue.set(state.character[path[0]], data.key, data.value)
      // Vue.set(state.character, data.key, data.value)
      // window.localStorage.setItem('character', window.JSON.stringify(state.character))
    },

    update_game_data (state, data) {
      Vue.set(state.gameData, data.key, data.value)
    }
  }
})

export default store
