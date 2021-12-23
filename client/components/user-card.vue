<template>
  <article class="user-card has-text-centered">
    <p style="width: 150px">
      <b-image :src="user.picture" ratio="1by1" custom-class="picture" rounded responsive/>
    </p>
    <div>
      <div class="title is-1 has-text-primary mb-0">
        {{ user.name }}
      </div>

      <div> {{ user.biography }} </div>

      <div class="has-text-centered">
        <a :href="`https://twitter.com/${user.slug}`">
          <b-icon icon="twitter" type="is-white"/>
        </a>
        <b-icon icon="circle-small" type="is-primary"/>
        <a @click="copyLink">
          <b-icon icon="link" type="is-white"/>
        </a>
      </div>
    </div>
  </article>
</template>

<script>
  import copy from 'copy-to-clipboard';

  export default {
    props: ['user'],
    methods: {
      copyLink() {
        copy(`${window.location.origin}/u/${this.user.slug}`);
        this.$buefy.toast.open({
          message: 'Link now on your clipboard!',
          type: 'is-primary',
          position: 'is-bottom'
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .user-card {
    margin: auto;
    p {
      display: inline-block;
    }
  }

  ::v-deep .picture {
    border: 9px double var(--primary);
    padding: 3px;
  }
</style>
