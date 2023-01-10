<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <vue-app-validation-errors v-if="errors" :validation-errors="errors"/>
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                    v-model="title"
                    class="form-control form-control-lg"
                    placeholder="Article title"
                    type="text"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                    v-model="description"
                    class="form-control form-control-lg"
                    placeholder="Description"
                    type="text"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                    v-model="body"
                    class="form-control form-control-lg"
                    placeholder="What is this article about?"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                    v-model="tagList"
                    class="form-control form-control-lg"
                    placeholder="Enter tags"
                    type="text"
                />
              </fieldset>
              <fieldset class="form-group">
                <button
                    :disabled="isSubmitting"
                    class="btn btn-lg pull-xs-right btn-primary"
                    type="submit"
                >
                  Publish Article
                </button>
              </fieldset>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueAppValidationErrors from "@/components/ValidationErrors.vue";

export default {
  name: 'VueAppArticleForm',
  props: {
    initialValues: {
      type: Object,
      required: true
    },
    errors: {
      type: Object,
      required: false
    },
    isSubmitting: {
      type: Boolean,
      required: true
    }
  },
  components: {
    VueAppValidationErrors
  },
  data() {
    return {
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' ')
    }
  },
  methods: {
    onSubmit() {
      const form = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList.split(' ')
      }
      this.$emit('articleSubmit', form)
    }
  }
}
</script>
