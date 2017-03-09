<template>
  <div>
    <transition name="sidenav">
      <xen-sidebar v-if="sidenavOpen" class="sidebar">
        <section class="xen-nav">

          <!--No user-->
          <div v-if="!user">
            <xen-list :dense="true">
              <router-link to="/sign-in">
                <xen-list-item text="Sign In" :bold="true" @click.native="$bus.$emit('close-sidenav');"></xen-list-item>
              </router-link>
              <router-link to="/sign-up">
                <xen-list-item text="Sign Up" :bold="true" @click.native="$bus.$emit('close-sidenav');"></xen-list-item>
              </router-link>
            </xen-list>
          </div>

          <!--User Links-->
          <div v-if="user">

            <section class="dndhub-profile-info" v-if="user">
              <!--<div class="dndhub-avatar">
                <img :src="user.photoURL" />
              </div>-->
              <span class="dndhub-email"><strong>{{ user.email }}</strong></span>
              <!-- {{ characters }} -->
              <!--<xen-select v-if="characters" class="character-select xen-color-primary" placeholder="Select a Character" :options="characters" :value="characterName" optionKey="name" @input="selectCharacter($event)"></xen-select>-->
            </section>
            <xen-list :dense="true">
              <router-link to="/sign-in">
                <xen-list-item text="Sign Out" :bold="true" @click.native="$bus.$emit('close-sidenav'); signOut()"></xen-list-item>
              </router-link>
              <router-link to="/profile">
                <xen-list-item text="Profile" :bold="true" @click.native="$bus.$emit('close-sidenav');"></xen-list-item>
              </router-link>
              <router-link to="/characters/list">
                <xen-list-item text="Character List" :bold="true" @click.native="$bus.$emit('close-sidenav');"></xen-list-item>
              </router-link>
            </xen-list>

            <xen-divider></xen-divider>

            <xen-list :dense="true" v-if="character">
              <router-link to="/general">
                <xen-list-item text="General" :bold="true" @click.native="$bus.$emit('close-sidenav');"></xen-list-item>
              </router-link>
              <router-link to="/profile">
                <xen-list-item text="Stats" :bold="true" @click.native="$bus.$emit('close-sidenav');"></xen-list-item>
              </router-link>
              <router-link to="/profile">
                <xen-list-item text="Feats" :bold="true" @click.native="$bus.$emit('close-sidenav');"></xen-list-item>
              </router-link>
              <router-link to="/profile">
                <xen-list-item text="Weapons" :bold="true" @click.native="$bus.$emit('close-sidenav');"></xen-list-item>
              </router-link>
              <router-link to="/profile">
                <xen-list-item text="Armor" :bold="true" @click.native="$bus.$emit('close-sidenav');"></xen-list-item>
              </router-link>
              <router-link to="/profile">
                <xen-list-item text="Spells" :bold="true" @click.native="$bus.$emit('close-sidenav');"></xen-list-item>
              </router-link>
              <router-link to="/profile">
                <xen-list-item text="Inventory" :bold="true" @click.native="$bus.$emit('close-sidenav');"></xen-list-item>
              </router-link>
              <!--<router-link to="/characters/new">
                <xen-list-item text="New Character" :bold="true" @click.native="$bus.$emit('close-sidenav');"></xen-list-item>
              </router-link>-->
            </xen-list>

            <xen-divider></xen-divider>

            <xen-list :dense="true">
              <router-link to="/profile">
                <xen-list-item text="Groups" :bold="true" @click.native="$bus.$emit('close-sidenav'); signOut()"></xen-list-item>
              </router-link>
            </xen-list>
          </div>

        </section>
      </xen-sidebar>
    </transition>
    <transition name="fade">
      <div class="xen-sidebar-backdrop" v-if="sidenavOpen" @click="sidenavOpen = false"></div>
    </transition>
  </div>
</template>

<script>
export default {

  // Name
  name: 'sidenav',

  // Components
  components: {},

  // Props
  props: [],

  // Data
  data () {
    return {
      sidenavOpen: false
    }
  },

  // Created
  created () {},

  // Mounted
  mounted () {
    this.$bus.$on('toggle-sidenav', () => {
      this.sidenavOpen = !this.sidenavOpen
    })

    this.$bus.$on('close-sidenav', () => {
      this.sidenavOpen = false
    })
  },

  // Methods
  methods: {
    async signOut () {
      try {
        await this.$firebase.auth().signOut()
        this.$bus.$emit('toast', `Sign out successful.`)
      } catch (error) {
        console.error(error)
      }
    },

    getCharacters () {
      const ref = this.$firebase.database().ref('characters/' + this.user.uid)
      ref.on('value', snapshot => {
        this.$store.commit('update_characters', snapshot.val())
      })

      // ref.on('child_added', data => {
      //   console.log(data.val())
      //   // this.$store.commit('update_characters', snapshot.val())
      //   this.$bus.$emit('toast', 'Character Created.')
      // })
//       commentsRef.on('child_added', function(data) {
//   addCommentElement(postElement, data.key, data.val().text, data.val().author);
// });
    }
  },

  // Computed
  computed: {
    user () {
      return this.$store.state.user
    },

    character () {
      return this.$store.state.character
    }
  },

  // Watch
  watch: {
    user (value) {
      if (value) {
        this.getCharacters()
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../styles/variables';
.dndhub-profile-info {
  padding: 16px;
  background-color: #eee;
}
.sidebar {
  left: 0;
}

.xen-sidebar-backdrop {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0,0,0,.52);
  z-index: 9;
  top: 0;
  left: 0;
}

.sidenav-enter-active, .sidenav-leave-active {
  transition: all 375ms $ease-out;
  transform: translateX(0px);
}
.sidenav-enter, .sidenav-leave-to {
  // opacity: 0;
  transition: all 375ms $ease-in;
  transform: translateX(-280px);
}
</style>
