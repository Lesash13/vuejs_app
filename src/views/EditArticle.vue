<template>
  <div>
    <vue-app-loading v-if="isLoading"/>
    <vue-app-article-form
        v-if="initialValues"
        :errors="validationErrors"
        :initialValues="initialValues"
        :isSubmitting="isSubmitting"
        @articleSubmit="onSubmit"
    >
    </vue-app-article-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/editArticle'
import VueAppLoading from "@/components/Loading.vue";
import VueAppArticleForm from "@/components/ArticleForm.vue";

export default {
  name: 'VueAppEditArticle',
  components: {
    VueAppArticleForm,
    VueAppLoading
  },
  computed: {
    ...mapState({
      isLoading: state => state.editArticle.isLoading,
      article: state => state.editArticle.article,
      isSubmitting: state => state.editArticle.isSubmitting,
      validationErrors: state => state.editArticle.validationErrors
    }),
    initialValues() {
      if (!this.article) {
        return null
      }
      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList
      }
    }
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug
    })
  },
  methods: {
    onSubmit(articleInput) {
      const slug = this.$route.params.slug
      this.$store
          .dispatch(actionTypes.updateArticle, {articleInput, slug})
          .then(article => {
            this.$router.push({name: 'article', params: {slug: article.slug}})
          })
    }
  }
}
</script>
