<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'register'}">
              Need an account?
            </router-link>
          </p>
          <vue-app-validation-errors
              v-if="validationErrors"
              :validation-errors="validationErrors"
          ></vue-app-validation-errors>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                  v-model="email"
                  class="form-control form-control-lg"
                  placeholder="Email"
                  type="text"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                  v-model="password"
                  class="form-control form-control-lg"
                  placeholder="Password"
                  type="password"
              />
            </fieldset>
            <button
                :disabled="isSubmitting"
                class="btn btn-lg btn-primary pull-xs-right"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/auth'
import VueAppValidationErrors from "@/components/ValidationErrors.vue";

export default {
  name: 'VueAppLogin',
  components: {
    VueAppValidationErrors
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.auth.isSubmitting,
      validationErrors: state => state.auth.validationErrors
    })
  },
  methods: {
    onSubmit() {
      this.$store
          .dispatch(actionTypes.login, {
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.$router.push({name: 'globalFeed'})
          })
    }
  }
}
</script>
