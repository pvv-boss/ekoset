<template functional>
  <div :class="[props.fullpage ? 'brc-nonauth-message__full-page' : '','brc-nonauth-message']">
    <nuxt-link :to="{ name: 'auth-login', params: {mode: 'login'} }">Войдите на сайт</nuxt-link>
    <span>или</span>
    <nuxt-link :to="{ name: 'auth-login', params: {mode: 'registration'} }">зарегистрируйтесь</nuxt-link>
    <span>{{ props.message }}</span>
  </div>
</template>
