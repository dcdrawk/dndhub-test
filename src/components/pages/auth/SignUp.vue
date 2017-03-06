<template>
  <div class="page-container">
    <!--<h2 class="title">Sign In</h2>-->
    <xen-page-toolbar class="xen-theme-indigo" title="Sign Up"></xen-page-toolbar>
    <section class="row space-around">
      <div class="col-xs-6">
        <xen-card>
          <xen-card-header>
            <h2 class="title">Sign Up</h2>
          </xen-card-header>
          <xen-card-content>
            <div class="">
              <xen-input
              label="Email"
              :value="email"
              @input="email = $event">
              </xen-input>

              <xen-input class="password"
              label="Password"
              type="password"
              :value="password"
              @input="password = $event">
              </xen-input>
            </div>
          </xen-card-content>
          <xen-card-actions class="text-right">
            <!--<xen-button class="xen-color-primary"
            @click.native="signIn"
            :disabled="errors.errors.length > 0">
            Sign Up
            </xen-button>-->
            <xen-button :raised="true"
            class="xen-theme-primary"
            @click.native="signUp()"
            :disabled="errors.errors.length > 0">
              Sign Up
            </xen-button>
          </xen-card-actions>
        </xen-card>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'sign-up',

  data () {
    return {
      email: undefined,
      password: undefined
    }
  },

  methods: {
    async signUp () {
      console.log('sign up')
      // this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      try {
        await this.$firebase.auth()
          .createUserWithEmailAndPassword(this.email, this.password)
      } catch (error) {
        console.warn(error)
      }
    }
  }
}
</script>

<style scoped>
.password {
  margin-bottom: 0;
}
</style>
