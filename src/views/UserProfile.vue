<template>
  <div v-if="userProfile" class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="userProfile.image" alt="" class="user-img"/>
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>
            <div>
              <router-link
                  v-if="isCurrentUserProfile"
                  :to="{name: 'settings'}"
                  class="btn btn-sm btn-outline-secondary action-btn"
              >
                Edit Profile Settings
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="article-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                    :class="{active: routeName === 'userProfile'}"
                    :to="{
                    name: 'userProfile',
                    params: {slug: userProfile.username}
                  }"
                    class="nav-link"
                >
                  My Posts
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                    :class="{active: routeName === 'userProfileFavorites'}"
                    :to="{
                    name: 'userProfileFavorites',
                    params: {slug: userProfile.username}
                  }"
                    class="nav-link"
                >
                  Favorites Posts
                </router-link>
              </li>
            </ul>
          </div>
          <vue-app-feed :api-url="apiUrl"></vue-app-feed>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'

import {actionTypes as userProfileActionTypes} from '@/store/modules/userProfile'
import {getterTypes as authGetterTypes} from '@/store/modules/auth'
import VueAppFeed from '@/components/Feed'

export default {
  name: 'VueAppUserProfile',
  components: {
    VueAppFeed
  },
  computed: {
    ...mapState({
      isLoading: state => state.userProfile.isLoading,
      userProfile: state => state.userProfile.data,
      error: state => state.userProfile.error
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser
    }),
    isCurrentUserProfile() {
      if (!this.currentUser || !this.userProfile) {
        return false
      }

      return this.currentUser.username === this.userProfile.username
    },
    userProfileSlug() {
      return this.$route.params.slug
    },
    apiUrl() {
      const isFavorites = this.$route.path.includes('favorites')
      return isFavorites
          ? `/articles?favorited=${this.userProfileSlug}`
          : `/articles?author=${this.userProfileSlug}`
    },
    routeName() {
      return this.$route.name
    }
  },
  watch: {
    userProfileSlug() {
      this.getUserProfile()
    }
  },
  mounted() {
    this.getUserProfile()
  },
  methods: {
    getUserProfile() {
      this.$store.dispatch(userProfileActionTypes.getUserProfile, {
        slug: this.userProfileSlug
      })
    }
  }
}
</script>
