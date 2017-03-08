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
            <input style="display:none" type="text" name="fakeusernameremembered"/>
            <input style="display:none" type="password" name="fakepasswordremembered"/>
            <xen-input
            class="xen-color-primary"
            label="Email"
            name="email"
            :value="email"
            @input="email = $event"
            :error="errors.first('email')"
            v-validate="'required|email'"
            data-vv-value-path="dataValue">
            </xen-input>

            <!--<input v-validate="'required|confirmed:repassword'" v-model="password" name="password" type="text">-->
            <!--{{ password }}-->
            <xen-input
            label="Password"
            name="password"
            type="password"
            :value="password"
            :error="errors.first('password')"
            @input="password = $event; checkPassword();"
            v-validate="'required|min:6'"
            data-vv-value-path="dataValue">
            </xen-input>

            <xen-input
            label="Re-type Password"
            name="repassword"
            type="password"
            :value="repassword"
            :error="errors.first('repassword') || error"
            v-validate="'required'"
            @input="repassword = $event; checkPassword();"
            data-vv-value-path="dataValue">
            </xen-input>
          </xen-card-content>
          <xen-card-actions class="text-right">
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
      password: undefined,
      repassword: undefined,
      error: undefined
    }
  },

  methods: {
    async signUp () {
      console.log('sign up')
      // this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      try {
        await this.$validator.validateAll()
        const user = await this.$firebase.auth()
          .createUserWithEmailAndPassword(this.email, this.password)
        this.$bus.$emit('toast', `Signed up as ${user.email}`)
        // console.log(response)
      } catch (error) {
        console.warn(error)
      }
    },

    checkPassword () {
      if (this.password && this.repassword && this.password !== this.repassword) {
        this.error = 'Passwords do not match.'
      } else {
        this.error = undefined
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
