<template>
  <b-navbar type="is-transparent">
    <template #brand>
        <b-navbar-item tag="nuxt-link" :to="{ path: '/' }">
          <img src="/logo.png"/>
        </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button icon-left="twitter" type="is-primary" outlined>
            Get your page!
          </b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<style lang="scss" scoped>
  img {
    max-height: 2.5rem;
  }
</style>
