<template>
  <div style="position: relative">
    <b-field :label="$store.state.me && user.slug === $store.state.me.slug ? 'Ask yourself! Nobody will notice.' : 'Hey anon, ask me something!'">
      <b-input v-model="content" type="textarea" :disabled="loading" :placeholder="randomQuestion" :maxlength="2500" :has-counter="false"/>
    </b-field>

    <b-button @click="ask" :loading="loading" :disabled="content.length < 5" class="ask" type="is-primary" size="is-medium" outlined>
      Ask!
    </b-button>
  </div>
</template>

<script>
  export default {
    props: ['user'],
    data() {
      return {
        content: '',
        loading: false,
        error: null
      };
    },
    computed: {
      randomQuestion() {
        return 'Do you like ducks?';
      }
    },
    methods: {
      async ask() {
        this.loading = true;
        this.error = null;
        try {
          const question = await this.$axios.$post(`user/${this.user.slug}/ask`, { content: this.content });
          this.$emit('done', question);
          this.content = '';
        }
        catch (e) {
          this.error = e;
          this.$buefy.toast.open({
            duration: 5000,
            message: 'We\'re sorry something went wrong. :( Try to refresh the page and if nothing works, try to logout.',
            type: 'is-danger',
            position: 'is-bottom'
          });
        }
        this.loading = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
  ::v-deep textarea {
    resize: none;
  }

  ::v-deep label {
    font-size: 1.5rem;
  }

  .ask {
    position: absolute;
    bottom: 7px;
    right: 7px;
  }
</style>
