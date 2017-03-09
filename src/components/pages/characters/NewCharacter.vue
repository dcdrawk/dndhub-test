<template>
  <div class="page-container">
    <xen-page-toolbar class="xen-theme-indigo" title="New Character"></xen-page-toolbar>
    <div class="xen-page-content xen-page-background">
      <xen-card class="row">
        <xen-card-header>
          <h2 class="title">Character Info</h2>
        </xen-card-header>
        <xen-card-content>
          <xen-input
          class="xen-color-primary"
          label="Character Name"
          name="name"
          :value="character.name"
          @input="character.name = $event"
          :error="errors.first('name')"
          v-validate="'required'"
          data-vv-value-path="dataValue">
          </xen-input>

          <xen-select :options="races" :option-key="'name'"
          :value="character.race"
          @input="$set(character, 'race', $event)">
          </xen-select>
          <xen-loading-spinner class="xen-color-primary" v-if="loading">
          </xen-loading-spinner>
        </xen-card-content>
        <xen-card-actions class="text-right">
          <xen-button :raised="true"
          class="xen-theme-primary"
          @click.native="createCharacter()"
          :disabled="errors.errors.length > 0">
            Create Character
          </xen-button>
        </xen-card-actions>
        {{ character }}
      </xen-card>
    </div>
  </div>
</template>

<script>
export default {
  // Name
  name: 'new-character',

  // Data
  data () {
    return {
      character: {},
      loading: false
    }
  },

  // Created
  created () {
    // const ref = this.$firebase.database().ref('characters/' + this.user.id)
    // // if (this.user) {
    // //   this.userEdit = this.user
    // // }
    // ref.once('value', function (snapshot) {
    //   console.log(snapshot.val())
    //   // snapshot.forEach(function(childSnapshot) {
    //   //   var childKey = childSnapshot.key;
    //   //   var childData = childSnapshot.val();
    //   //   // ...
    //   // });
    // })
  },

  // Methods
  methods: {
    createCharacter () {
      // console.log(this.user)
      const charRef = this.$firebase.database().ref('characters/' + this.user.uid)
      charRef.push(this.character)
    }
    // getCharacters () {
    //   const ref = this.$firebase.database().ref('characters/' + this.user.id)
    //   ref.once('value', snapshot => {
    //     console.log(snapshot.val())
    //     this.characters = snapshot.val()
    //   })
    // }
  },

  // Computed
  computed: {
    user () {
      return this.$store.state.user
    },

    races () {
      return this.$store.state.gameData.races
    }
  },

  watch: {
    user (value) {
      if (value) {
        // this.getCharacters()
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
