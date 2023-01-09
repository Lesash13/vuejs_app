<template>
  <div class="home-page">
    <vue-app-banner/>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <vue-app-toggler :tag-name="tagName"></vue-app-toggler>
          <vue-app-feed :api-url="apiUrl"></vue-app-feed>
        </div>
        <div class="col-md-3">
          <vue-app-popular-tags/>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import VueAppBanner from "@/components/Banner.vue";
import VueAppToggler from "@/components/FeedToggler.vue";
import VueAppFeed from "@/components/Feed.vue";
import VueAppPopularTags from "@/components/PopularTags.vue";

export default {
  name: 'VueAppYourFeed',
  components: {
    VueAppPopularTags,
    VueAppFeed,
    VueAppToggler,
    VueAppBanner
  },
  computed: {
    tagName() {
      return this.$route.params.slug
    },
    apiUrl() {
      return `/articles?tag=${this.tagName}`
    }
  }
}
</script>
