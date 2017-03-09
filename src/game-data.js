import axios from 'axios'

export default class GameData {
  static data = [
    'alignments',
    'armor',
    'backgrounds',
    'classes',
    'classFeatures',
    'feats',
    'inventory',
    'languages',
    'races',
    'skills',
    'spells',
    'weapons'
  ]

  // Import the game data
  static importData (vm) {
    console.log(vm)
    this.data.forEach(async (file) => {
      const response = await axios.get(`/static/data/${file}.json`)
      vm.$store.commit('update_game_data', {
        key: file,
        value: response.data[file]
      })
    })
  }
}
