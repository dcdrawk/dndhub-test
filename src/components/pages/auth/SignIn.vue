<template>
  <div>
    <h2 class="title">Sign In</h2>
    <xen-input
    label="Username"
    :value="username"
    @input="username = $event">
    </xen-input>

    <xen-input
    label="Password"
    type="password"
    :value="password"
    @input="password = $event">
    </xen-input>

    <xen-button class="xen-theme-primary">
      Sign In
    </xen-button>
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

<style>
</style>
