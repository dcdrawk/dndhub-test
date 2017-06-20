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
    gameData: {},
    groupId: window.localStorage.getItem('groupId')
    ? JSON.parse(window.localStorage.getItem('groupId'))
    : undefined
  },

  // Mutations
  mutations: {
    login (state, user) {
      state.user = user
    },

    logout (state, user) {
      state.user = undefined
      state.character = undefined
      state.characterId = undefined
      state.characters = undefined
      state.group = undefined
      window.localStorage.removeItem('characterId')
      window.localStorage.removeItem('group')
    },

    update_characters (state, characters) {
      state.characters = characters
    },

    set_character (state, character) {
      console.log('state set char')
      console.log(character)

      if (character) {
        if (character.id) {
          state.characterId = character.id
          window.localStorage.setItem('characterId', character.id)
        }
      } else {
        state.characterId = undefined
        window.localStorage.removeItem('characterId')
      }
      // state.character = character
      Vue.set(state, 'character', character)
    },

    update_character (state, data) {
      Vue.set(state.character, data.key, data.value)
      // window.localStorage.setItem('character', window.JSON.stringify(state.character))
    },

    select_group (state, groupId) {
      // if (state.group) {

      // }
      // groupRef.on
      // groupRef.on('value', (snapshot) => {
      //   state.group = group
      // })
      state.groupId = groupId
      Vue.set(state, 'groupId', groupId)
      window.localStorage.setItem('groupId', window.JSON.stringify(state.groupId))
    },

    update_group (state, groupId) {
      // if (state.group) {

      // }
      // groupRef.on
      // groupRef.on('value', (snapshot) => {
      //   state.group = group
      // })
      state.groupId = groupId
      Vue.set(state, 'groupId', groupId)
      window.localStorage.setItem('groupId', window.JSON.stringify(state.groupId))
    },

    push_item (state, data) {
      console.log(data)
      if (!state.character[data.prop]) {
        Vue.set(state.character, data.prop, {})
      }
      Vue.set(state.character[data.prop], data.key, data.value)
    },

    remove_item (state, data) {
      Vue.delete(state.character[data.prop], data.id)
    },

    update_ability_score (state, data) {
      if (state.character.abilityScores) {
        Vue.set(state.character.abilityScores[data.score], data.key, data.value)
      }
    },

    update_saving_throw (state, data) {
      if (state.character.savingThrows) {
        Vue.set(state.character.savingThrows[data.score], data.key, data.value)
      }
    },

    update_skills (state, data) {
      if (state.character.skills) {
        Vue.set(state.character.skills[data.skill], data.key, data.value)
      }
    },

    update_game_data (state, data) {
      Vue.set(state.gameData, data.key, data.value)
    }
  }
})

export default store
