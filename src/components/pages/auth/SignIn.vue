<template>
  <div class="page-container">
    <xen-page-toolbar class="xen-theme-indigo" title="Sign In"></xen-page-toolbar>
    <section class="row space-around">
      <div class="col-xs-12 col-md-6 xen-no-margin-sm">

        <xen-card v-if="user">
          <xen-card-content  class="xen-theme-teal">
            <p class="text-center">
              Currently signed in as {{user.email}}.
            </p>
            <p class="text-center"><strong @click="signOut()">Sign Out</strong></p>
          </xen-card-content>
        </xen-card>

        <xen-card>
          <xen-card-header>
            <h2 class="title">Sign In</h2>
          </xen-card-header>
          <xen-card-content>
            <form class="">
              <xen-input
              class="xen-color-primary"
              label="Email"
              :value="email"
              @input="email = $event"
              :error="errors.first('email')"
              v-validate="'required|email'"
              data-vv-value-path="dataValue">
              </xen-input>

              <xen-input class="password xen-color-primary"
              label="Password"
              type="password"
              :value="password"
              @input="password = $event"
              :error="errors.first('password')"
              v-validate="'required'"
              data-vv-value-path="dataValue">
              </xen-input>
            </form>
            <xen-loading-spinner class="xen-color-primary" v-if="loading">
            </xen-loading-spinner>
          </xen-card-content>
          <xen-card-actions class="text-right">
            <xen-button :raised="true"
            class="xen-theme-primary"
            @click.native="signIn"
            :disabled="errors.errors.length > 0">
              Sign In
            </xen-button>
          </xen-card-actions>
        </xen-card>

        <xen-card v-if="!user">
          <xen-card-content>
            <p class="text-center">
              Don't have an account?
              <router-link to="/sign-up">
                <strong class="xen-color-primary">Sign Up.</strong>
              </router-link>
            </p>
          </xen-card-content>
        </xen-card>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'sign-in',

  data () {
    return {
      email: undefined,
      password: undefined,
      loading: false
    }
  },

  methods: {
    async signIn () {
      try {
        this.loading = true
        const user = await this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        this.$bus.$emit('toast', `Signed in as ${user.email}`)
        this.$router.push({name: 'Profile'})
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async signOut () {
      try {
        await this.$firebase.auth().signOut()
        this.$bus.$emit('toast', `Sign out successful.`)
      } catch (error) {
        console.error(error)
      }
    }
  },

  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style scoped>
.password {
  margin-bottom: 0;
}
</style>
