<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'login'}">
              Have an account?
            </router-link>
          </p>
          <vue-app-validation-errors
              v-if="validationErrors"
              :validation-errors="validationErrors"
          ></vue-app-validation-errors>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                  v-model="username"
                  class="form-control form-control-lg"
                  placeholder="Username"
                  type="text"
              />
            </fieldset>
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
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueAppValidationErrors from '@/components/ValidationErrors'
import {actionTypes} from "@/store/modules/auth";
import {mapState} from "vuex";

export default {
  name: 'VueAppRegister',
  components: {
    VueAppValidationErrors
  },
  data() {
    return {
      email: '',
      password: '',
      username: ''
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
          .dispatch(actionTypes.register, {
            email: this.email,
            username: this.username,
            password: this.password
          })
          .then(() => {
            this.$router.push({name: 'globalFeed'})
          })
    }
  }
}
</script>
