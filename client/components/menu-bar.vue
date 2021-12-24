<template>
  <b-navbar type="is-transparent">
    <template #brand>
      <b-navbar-item tag="nuxt-link" :to="{ path: $store.state.me ? `/u/${$store.state.me.slug}` : '/' }">
        <img src="/0w0.svg"/>
        &nbsp;&nbsp;
        <strong class="has-text-primary is-size-4"> 0w0 </strong>
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div v-if="$store.state.me">
          <b-navbar-dropdown arrowless right>
            <template slot="label">
              <figure class="image is-hidden-mobile">
                <img :src="$store.state.me.picture" class="is-rounded"/>
              </figure>
            </template>

            <b-navbar-item v-if="$route.params.slug !== $store.state.me.slug" tag="nuxt-link" :to="`/u/${$store.state.me.slug}`" class="has-text-centered">
              <b-icon icon="link"/>
              &nbsp;&nbsp; My page
            </b-navbar-item>
            <b-navbar-item tag="a" @click="$store.dispatch('LOGOUT')" class="has-text-centered">
              <b-icon icon="logout"/>
              &nbsp;&nbsp; Ight Imma Head Out
            </b-navbar-item>
          </b-navbar-dropdown>
        </div>
        <div v-else class="buttons">
          <oauth-twitter>
            <b-button icon-left="twitter" type="is-primary" outlined>
              Get your page!
            </b-button>
          </oauth-twitter>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<style lang="scss" scoped>
  img {
    height: 4.5rem;
    max-height: unset;
  }
</style>
