<template>
  <a @click="connectWithTwitter">
    <slot/>
  </a>
</template>

<script>
export default {
  methods: {
    connectWithTwitter() {
      // todo, redirect to twitter oauth
    }
  }
};
</script>
