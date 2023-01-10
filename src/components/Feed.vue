<template>
  <div>
    <vue-app-loading v-if="isLoading"/>
    <vue-app-error-message v-if="error"/>
    <div v-if="feed">
      <div
          v-for="(article, index) in feed.articles"
          :key="index"
          class="article-preview"
      >
        <div class="article-meta">
          <router-link
              :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" alt=""/>
          </router-link>
          <div class="info">
            <router-link
                :to="{
                name: 'userProfile',
                params: {slug: article.author.username}
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">
            <vue-app-add-to-favorites
                :article-slug="article.slug"
                :favorites-count="article.favoritesCount"
                :is-favorited="article.favorited"
            ></vue-app-add-to-favorites>
          </div>
        </div>
        <router-link
            :to="{name: 'article', params: {slug: article.slug}}"
            class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <vue-app-tag-list :tags="article.tagList"/>
        </router-link>
      </div>
      <vue-app-pagination
          :current-page="currentPage"
          :limit="limit"
          :total="feed.articlesCount"
          :url="baseUrl"
      ></vue-app-pagination>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

import {actionTypes} from '@/store/modules/feed'
import VueAppPagination from '@/components/Pagination'
import {limit} from '@/helpers/vars'
import VueAppLoading from '@/components/Loading'
import VueAppErrorMessage from '@/components/ErrorMessage'
import queryString from 'query-string'
import VueAppTagList from '@/components/TagList.vue'
import VueAppAddToFavorites from '@/components/AddToFavorites.vue'

export default {
  name: 'VueAppFeed',
  components: {
    VueAppPagination,
    VueAppLoading,
    VueAppErrorMessage,
    VueAppTagList,
    VueAppAddToFavorites
  },
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error
    }),
    limit() {
      return limit
    },
    baseUrl() {
      return this.$route.path
    },
    currentPage() {
      return Number(this.$route.query.page || '1')
    },
    offset() {
      return this.currentPage * limit - limit
    }
  },
  watch: {
    currentPage() {
      this.fetchFeed()
    },
    apiUrl() {
      this.fetchFeed()
    }
  },
  mounted() {
    this.fetchFeed()
  },
  methods: {
    fetchFeed() {
      const parsedUrl = queryString.parseUrl(this.apiUrl)
      const stringifiedParams = queryString.stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query
      })
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
      this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams})
    }
  }
}
</script>
