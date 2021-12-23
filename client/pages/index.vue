<template>
  <div style="position: relative; height: calc(100vh - 120px)">
    <section class="hero is-primary is-halfheight">
      <div class="hero-body" style="width: 435px; margin: auto">
        <div class="title">
          Welcome to NUGGET! 👀
          <br/><br/>
          <div class="subtitle">
            <i> We're a minimalist anonymous Q&A website... </i>
            <br/><br/>
            <b> Step 1. </b> You link your twitter account. <br/>
            <b> Step 2. </b> Anons ask you questions. <br/>
            <b> Step 3. </b> You share your cool answers. <br/>
            <br/><br/>
            <oauth-twitter>
              <b-button size="is-large" type="is-primary" icon-left="twitter" inverted>
                So basically you click here
              </b-button>
            </oauth-twitter>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  .hero {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
