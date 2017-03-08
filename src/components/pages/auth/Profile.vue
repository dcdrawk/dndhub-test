<template>
  <div class="page-container">
    <xen-page-toolbar class="xen-theme-indigo" title="Profile"></xen-page-toolbar>
    <div class="xen-page-content xen-page-background">


      <div class="row space-around">
        <!--Loading Spinner-->
        <div class="col-xs-12" v-if="!user">
          <xen-loading-spinner class="xen-color-primary"></xen-loading-spinner>
        </div>

        <div class="col-lg-9 col-md-9 col-xs-12" v-if="user">
          <xen-card>
            <xen-card-content>
              <div class="row">
                <div class="col-xs-12">
                  <xen-input label="Display Name"
                  name="display"
                  class="xen-color-primary"
                  :value="userEdit.displayName"
                  @input="userEdit.displayName = $event"
                  :disabled="!editing">
                  </xen-input>
                  <xen-input label="Email"
                  name="email"
                  class="xen-color-primary"
                  rules="required|email"
                  :value="userEdit.email"
                  @input="userEdit.email = $event"
                  :disabled="!editing">
                  </xen-input>
                  <xen-loading-spinner class="xen-color-primary" v-if="saving"></xen-loading-spinner>
                </div>
              </div>
            </xen-card-content>

            <xen-card-actions class="text-right">
              <xen-button v-if="!editing" class="xen-color-primary" @click.native="editProfile();">Edit</xen-button>
              <xen-button v-if="editing" class="" @click.native="cancelEdit();">Cancel</xen-button>
              <xen-button v-if="editing"class="xen-theme-primary" :raised="true" @click.native="saveEdit();">Save</xen-button>
            </xen-card-actions>
          </xen-card>
        </div>

      </div>


    </div>

  </div>
</template>

<script>
export default {

  // Name
  name: 'profile-page',

  // Components
  components: {},

  // Props
  props: [],

  // Data
  data () {
    return {
      editing: false,
      userEdit: undefined,
      userCopy: undefined,
      saving: false
    }
  },

  // Created
  created () {
    if (this.user) {
      this.userEdit = this.user
    }
  },

  // Mounted
  mounted () {},

  // Methods
  methods: {
    editProfile () {
      this.userCopy = Object.assign({}, this.user)
      this.editing = true
    },

    cancelEdit () {
      // this.user = Object.assign({}, this.userCopy)
      // console.log()
      this.userEdit = this.userCopy
      this.editing = false
    },

    async saveEdit () {
      // const user = this.$firebase.auth().currentUser
      this.userCopy = undefined
      this.editing = false
      this.saving = true
      try {
        await this.user.updateProfile({
          displayName: this.user.displayName,
          email: this.user.email
        })
        this.$bus.$emit('toast', 'Profile Updated.')
      } catch (error) {
        console.error(error)
      } finally {
        this.saving = false
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
  watch: {
    user (value) {
      console.log('user updated...')
      this.userEdit = value
    }
  }
}
</script>

<style scoped lang="scss">
</style>
