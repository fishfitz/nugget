<template>
  <div>
    <user-card :user="user"/>

    <br/><hr/><br/>

    <template v-if="highlightQuestion">
      <question-thread :user="user" :question="highlightQuestion" @answer="questionToAnswer = $event" @delete="deleteQuestion" :highlight="true"/>
      <br/><hr/><br/>
    </template>

    <ask-question :user="user" @done="addQuestion"/>

    <br/><hr/><br/>

    <div>
      <question-thread v-for="question in questions.data" :key="question.id"
        :user="user" :question="question"
        @answer="questionToAnswer = $event" @delete="deleteQuestion"/>
      <mugen-scroll :handler="loadMore" :should-handle="!loading && questions.meta.last_page !== page"/>
    </div>

    <b-modal :active="!!questionToAnswer" @close="questionToAnswer = null" has-modal-card trap-focus>
      <template #default="props">
        <answer-question v-if="questionToAnswer" :user="user" :question="questionToAnswer" @done="updateQuestion"/>
      </template>
    </b-modal>
  </div>
</template>

<script>
  import MugenScroll from 'vue-mugen-scroll';

  export default {
    components: { MugenScroll },
    data() {
      return {
        questionToAnswer: null,
        page: 1,
        loading: false,
        error: null
      };
    },
    async asyncData({ $axios, params: { slug }, query: { q } }) {
      return {
        user: await $axios.$get(`user/${slug}`),
        questions: await $axios.$get(`user/${slug}/questions`),
        highlightQuestion: q ? await $axios.$get(`user/${slug}/question/${q}`) : null
      };
    },
    head() {
      return { title: `Ask ${this.user.name}` };
    },
    methods: {
      addQuestion(question) {
        this.questions.data.unshift(question);
      },
      updateQuestion(question) {
        this.questions.data.splice(this.questions.data.findIndex((q) => q.id === question.id), 1, question);
        this.questionToAnswer = null;
      },
      deleteQuestion(question) {
        this.$buefy.dialog.confirm({
          title: 'Yeet the question?',
          message: 'It will be gone. <br/> Forever.',
          confirmText: 'Yes delete it',
          cancelText: 'Nah keep it',
          type: 'is-primary',
          icon: 'delete-sweep',
          hasIcon: true,
          onConfirm: async () => {
            await this.$axios.$delete(`/user/${this.user.slug}/question/${question.id}`);
            this.questions.data.splice(this.questions.data.indexOf(question), 1);
          }
        });
      },
      async loadMore() {
        this.page++;
        this.error = null;
        this.loading = true;
        try {
          const questions = await this.$axios.$get(`/user/${this.user.slug}/questions`, { params: { page: this.page } });
          this.questions = {
            ...questions,
            data: [this.questions.data, ...questions.data]
          };
        }
        catch (e) {
          this.error = e;
        }
      }
    }
  };
</script>
