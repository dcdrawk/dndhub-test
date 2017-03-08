<template>
  <div>
    <transition name="sidenav">
      <xen-sidebar v-if="sidenavOpen" class="sidebar">
        <section class="xen-nav">

          <!--No user-->
          <xen-list :dense="true" v-if="!user">
            <router-link to="/sign-in">
              <xen-list-item text="Sign In" :bold="true" @click.native="$bus.$emit('close-sidenav');"></xen-list-item>
            </router-link>
            <router-link to="/sign-up">
              <xen-list-item text="Sign Up" :bold="true" @click.native="$bus.$emit('close-sidenav');"></xen-list-item>
            </router-link>
          </xen-list>

          <!--User Links-->
          <xen-list :dense="true" v-if="user">
            <router-link to="/sign-in">
              <xen-list-item text="Sign Out" :bold="true" @click.native="$bus.$emit('close-sidenav'); signOut()"></xen-list-item>
            </router-link>
            <router-link to="/profile">
              <xen-list-item text="Profile" :bold="true" @click.native="$bus.$emit('close-sidenav');"></xen-list-item>
            </router-link>
          </xen-list>
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
    }
  },

  // Computed
  computed: {
    user () {
      return this.$store.state.user
    }
  },

  // Watch
  watch: {}
}
</script>

<style scoped lang="scss">
@import '../../styles/variables';

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
