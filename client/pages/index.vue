<template>
  <div style="position: relative; height: calc(100vh - 120px)">
    <section class="hero is-primary is-halfheight">
      <div class="hero-body" style="margin: auto">
        <div class="title">
          <b> 0w0 what's this? </b>
          <br/><br/>
          <div class="subtitle">
            <i> We're a minimalist anonymous Q&A website... 👀 </i>
            <br/><br/>
            <b> Step 1. </b> You link your twitter account. <br/>
            <b> Step 2. </b> Anons ask you questions. <br/>
            <b> Step 3. </b> You share your cool answers. <br/>
            <br/><br/>
            <oauth-twitter>
              <b-button size="is-large" type="is-primary" icon-left="twitter" inverted expanded>
                &nbsp;So basically you click here
              </b-button>
            </oauth-twitter>

            <br/><br/><br/><hr style="background-color: white"/><br/><br/>

            <div class="content">
              <small class="is-size-7">
                <div> Hey! This place is a bit of a WIP...! Here are some things to come very soon: </div>
                <ul>
                  <li> Post medias with your answers. </li>
                  <li> Better twitter integration. </li>
                  <li> Ban stupid ppl from your page. </li>
                </ul>
                <div> You can contact me at <b> leneal.wyatt<b-icon icon="at" size="is-small"/>gmail<b-icon icon="circle-small" size="is-small"/>com. </b> </div>
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    async middleware({ query, store, redirect, $axios }) {
      if (query.code && query.state) {
        try {
          await $axios.$get('/twitter/callback', { params: query });
          await store.dispatch('FETCH_ME');
          if (!store.state.me) throw new Error('NO_USER');
          redirect(`/u/${store.state.me.slug}`);
        }
        catch (e) {
          redirect('/error');
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .hero {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media (max-width: 500px) {
      transform: translate(-50%, -50%) scale(.65);
    }
  }
</style>
