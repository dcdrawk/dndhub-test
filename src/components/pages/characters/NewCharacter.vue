<template>
  <div class="page-container">
    <xen-page-toolbar class="xen-theme-indigo" title="New Character"></xen-page-toolbar>
    <div class="xen-page-content xen-page-background">
      <xen-card class="new-character-card">
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

          <div class="row">
            <div class="col-xs-6 xen-no-margin">
              <xen-input
              class="xen-color-primary"
              type="number"
              label="Level"
              name="level"
              :value="character.level"
              @input="$set(character, 'level', $event)">
              </xen-input>
            </div>
            <div class="col-xs-6 xen-no-margin">
              <xen-input
              class="xen-color-primary"
              type="number"
              label="Experience"
              name="experience"
              :value="character.experience"
              @input="$set(character, 'experience', $event)">
              </xen-input>
            </div>
          </div>

          <xen-select :options="classes" :option-key="'name'"
          class="xen-color-primary"
          label="Class"
          :value="character.classPrimary"
          @input="$set(character, 'classPrimary', $event)">
          </xen-select>

          <xen-select :options="races" :option-key="'name'"
          class="xen-color-primary"
          label="Race"
          :value="character.race"
          @input="$set(character, 'race', $event)">
          </xen-select>

          <xen-select :options="alignments" :option-key="'name'"
          class="xen-color-primary"
          label="Alignment"
          :value="character.alignment"
          @input="$set(character, 'alignment', $event)">
          </xen-select>

          <xen-select :options="backgrounds" :option-key="'name'"
          class="xen-color-primary"
          label="Backgrounds"
          :value="character.background"
          @input="$set(character, 'background', $event)">
          </xen-select>

          <xen-loading-spinner class="xen-color-primary" v-if="loading">
          </xen-loading-spinner>
        </xen-card-content>
        <xen-card-actions class="text-right">
          <xen-button :raised="false"
          :disabled="errors.errors.length > 0"
          @click.native="$router.push('/characters/list');">
            Character List
          </xen-button>
          <xen-button :raised="true"
          class="xen-theme-primary"
          @click.native="createCharacter()"
          :disabled="errors.errors.length > 0">
            Create
          </xen-button>
        </xen-card-actions>
        <!--{{ character }}-->
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
    async createCharacter () {
      try {
        await this.$validator.validateAll()
        const charRef = this.$firebase.database().ref('characters/' + this.user.uid)
        await charRef.push(this.character)
        this.$bus.$emit('toast', 'Character Created.')
        this.$router.push('/characters/list')
      } catch (error) {
        console.error(error)
      }
    }
  },

  // Computed
  computed: {
    user () {
      return this.$store.state.user
    },

    races () {
      return this.$store.state.gameData.races
    },

    classes () {
      return this.$store.state.gameData.classes
    },

    alignments () {
      return this.$store.state.gameData.alignments
    },

    backgrounds () {
      return this.$store.state.gameData.backgrounds
    }
  }

  // watch: {
  //   user (value) {
  //     if (value) {
  //       // this.getCharacters()
  //     }
  //   }
  // }
}
</script>

<style scoped lang="scss">
.new-character-card {
  margin-bottom: 0;
}
</style>
