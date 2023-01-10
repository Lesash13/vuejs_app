<template>
  <div v-if="currentUser" class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Settings</h1>
          <vue-app-error-message
              v-if="validationErrors"
              :validation-errors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                    v-model="form.image"
                    class="form-control form-control-lg"
                    placeholder="URL of profile image"
                    type="text"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                    v-model="form.username"
                    class="form-control form-control-lg"
                    placeholder="Username"
                    type="text"
                />
              </fieldset>

              <fieldset class="form-group">
                <textarea
                    v-model="form.bio"
                    class="form-control form-control-lg"
                    placeholder="Short bio about you"
                ></textarea>
              </fieldset>

              <fieldset class="form-group">
                <input
                    v-model="form.email"
                    class="form-control form-control-lg"
                    placeholder="Email"
                    type="text"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                    v-model="form.password"
                    class="form-control form-control-lg"
                    placeholder="New password"
                    type="password"
                />
              </fieldset>
              <button
                  :disabled="isSubmitting"
                  class="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
              >
                Update settings
              </button>
            </fieldset>
          </form>
          <hr/>
          <button class="btn btn-outline-danger" @click="logout">
            Or cick here to logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import {actionTypes as authActionTypes, getterTypes as authGetterTypes} from '@/store/modules/auth'
import VueAppErrorMessage from "@/components/ErrorMessage.vue";

export default {
  name: 'VueAppSettings',
  components: {
    VueAppErrorMessage,
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.settings.isSubmitting,
      validationErrors: state => state.settings.validationErrors
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser
    }),
    form() {
      return {
        username: this.currentUser.username,
        bio: this.currentUser.bio,
        image: this.currentUser.image,
        email: this.currentUser.email,
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch(authActionTypes.updateCurrentUser, {
        currentUserInput: this.form
      })
    },
    logout() {
      this.$store.dispatch(authActionTypes.logout).then(() => {
        this.$router.push({name: 'globalFeed'})
      })
    }
  }
}
</script>
