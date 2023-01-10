<template>
  <vue-app-article-form
      :errors="validationErrors"
      :initialValues="initialValues"
      :isSubmitting="isSubmitting"
      @articleSubmit="onSubmit"
  >
  </vue-app-article-form>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/createArticle'
import VueAppArticleForm from "@/components/ArticleForm.vue";

export default {
  name: 'VueAppCreateArticle',
  components: {
    VueAppArticleForm,
  },
  data() {
    return {
      initialValues: {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.createArticle.isSubmitting,
      validationErrors: state => state.createArticle.validationErrors
    })
  },
  methods: {
    onSubmit(articleInput) {
      this.$store
          .dispatch(actionTypes.createArticle, {articleInput})
          .then(article => {
            this.$router.push({name: 'article', params: {slug: article.slug}})
          })
    }
  }
}
</script>
