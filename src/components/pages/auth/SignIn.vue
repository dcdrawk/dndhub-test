<template>
  <div class="page-container">
    <!--<h2 class="title">Sign In</h2>-->
    <xen-page-toolbar class="xen-theme-indigo" title="Sign In"></xen-page-toolbar>
    <section class="row space-around">
      <div class="col-xs-6">
        <xen-card>
          <xen-card-header>
            <h2 class="title">Sign In</h2>
          </xen-card-header>
          <xen-card-content>
            <form class="">
              <xen-input
              label="Username"
              :value="username"
              @input="username = $event">
              </xen-input>

              <xen-input class="password"
              label="Password"
              type="password"
              :value="password"
              @input="password = $event">
              </xen-input>
              </xen-input>
            </form>
          </xen-card-content>
          <xen-card-actions class="text-right">
            <!--<xen-button class="xen-color-primary"
            @click.native="signIn"
            :disabled="errors.errors.length > 0">
            Sign Up
            </xen-button>-->
            <xen-button :raised="true"
            class="xen-theme-primary"
            @click.native="signIn"
            :disabled="errors.errors.length > 0">
              Sign In
            </xen-button>
          </xen-card-actions>
        </xen-card>
      </div>
    </section>
    <div class="row">
      Don't have an account?
      <router-link to="/sign-up">
        Sign Up.
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',

  data () {
    return {
      username: undefined,
      password: undefined
    }
  }
}
</script>

<style scoped>
.password {
  margin-bottom: 0;
}
</style>
