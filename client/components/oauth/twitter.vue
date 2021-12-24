<template>
  <a @click="connectWithTwitter">
    <slot/>
  </a>
</template>

<script>
export default {
  methods: {
    async connectWithTwitter() {
      const url = await this.$axios.$get('/twitter/redirect');
      window.location = url;
    }
  }
};
</script>
