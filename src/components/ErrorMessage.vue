<template>
  <div>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'VueAppErrorMessage',
  props: {
    message: {
      type: String,
      required: false,
      default: 'Something went wrong'
    }
  }
}
</script>
