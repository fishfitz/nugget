<template>
  <div class="modal-card" style="width: 600px; max-width: 100%">
    <div class="modal-card-body">
      <h1>
        <small class="has-text-grey"> Asked {{ createdAt }} <br/> </small>
        {{ question.content }}
      </h1>

      <br/><hr/><br/>

      <div style="position: relative">
        <b-field>
          <b-input v-model="answer" type="textarea" :disabled="loading" :maxlength="2500" :has-counter="false"
            placeholder="For sure, ducks are the best!" custom-class="answer"/>
        </b-field>

        <b-button @click="answerQuestion" :loading="loading" type="is-primary" size="is-medium" style="margin: auto" class="answer-button" outlined>
          Answer!
        </b-button>
      </div>

      <b-switch v-if="!question.answered_at" v-model="tweet">
        Post it on twitter
      </b-switch>
    </div>
  </div>
</template>

<script>
  import { format } from 'timeago.js';

  export default {
    props: ['user', 'question'],
    data() {
      return {
        answer: '',
        tweet: true,
        loading: false,
        error: null
      };
    },
    computed: {
      createdAt() {
        return format(new Date(this.question.created_at));
      }
    },
    methods: {
      async answerQuestion() {
        this.loading = true;
        this.error = null;
        try {
          const question = await this.$axios.$post(`user/${this.user.slug}/question/${this.question.id}/answer`,
            {
              answer: this.answer,
              tweet: this.tweet && !this.question.answered_at
            });
          this.$emit('done', question);
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
    },
    mounted() {
      this.answer = this.question.answer;
    }
  };
</script>

<style lang="scss" scoped>
  ::v-deep textarea {
    resize: none;
  }

  ::v-deep .answer {
    height: 250px;
  }

  .answer-button {
    position: absolute;
    bottom: 7px;
    right: 7px;
  }

  .modal-card {
    padding: 2px;
    border: 6px double var(--primary);
  }
</style>
