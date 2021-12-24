<template>
  <div class="card" :class="{ 'highlight': highlight }">
    <div class="commands is-pulled-right">
      <b-button v-if="isOwner" :icon-left="question.answered_at ? 'pen': 'message'" @click="$emit('answer', question)" :type="question.answered_at ? 'is-ghost' : 'is-primary'" outlined>
        <template v-if="!question.answered_at"> Reply </template>
      </b-button>
      <b-button v-if="question.answered_at" @click="shareQuestion" icon-left="link" type="is-ghost"/>
      <b-button v-if="isOwner" @click="deleteQuestion" icon-left="delete" type="is-ghost"/>
    </div>
    <small> {{ createdAt }} </small>
    <br/>
    <div class="has-text-justified">
      <strong class="has-text-primary"> {{ question.content }} </strong>
    </div>
    <div v-if="question.answered_at" class="answer has-text-justified">
      <b> | </b> &nbsp;
      {{ question.answer }}
      <br/>
    </div>
  </div>
</template>

<script>
  import { format } from 'timeago.js';
  import copy from 'copy-to-clipboard';

  export default {
    props: ['user', 'question', 'highlight'],
    computed: {
      isOwner() {
        return this.user.slug === this.$store.state.me?.slug;
      },
      createdAt() {
        return format(new Date(this.question.created_at));
      },
      answeredAt() {
        return format(new Date(this.question.answered_at));
      }
    },
    methods: {
      shareQuestion() {
        copy(`${window.location.origin}/u/${this.user.slug}?q=${this.question.id}`);
        this.$buefy.toast.open({
          message: 'Link now on your clipboard!',
          type: 'is-primary',
          position: 'is-bottom'
        });
      },
      async deleteQuestion() {
        this.$emit('delete', this.question);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .card {
    padding: 20px;
    margin-bottom: 10px;
    border: none;
    border-radius: 0;

    &.highlight {
      outline: 3px double var(--primary);
      outline-offset: 1px;
    }

    &:hover .commands {
      opacity: 1;
    }
  }

  .answer {
    padding-left: 20px;
  }

  .commands {
    opacity: .2;
    transition: opacity ease-in .15s;
  }
</style>
