<template>
  <main>
    <section class="brc-section__wrapper">
      <div>
        <h1>Настройка Аккаунта</h1>
        <nuxt-link :to="{ name: 'user-deals-contracts' }">Временно</nuxt-link>
      </div>
      <div class="brc-user-profile">
        <AccountMain class="mt-40"></AccountMain>
        <NotificationSettings class="mt-40"></NotificationSettings>
        <ChangePassword class="mt-40"></ChangePassword>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class UserProfile extends Vue {
}
</script>

<style lang="scss">
.brc-user-profile {
  display: grid;

  grid-template-columns: repeat(1, minmax(0, 1fr));

  @media (min-width: 760px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 30px;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 45px;
  }

  .mt-40 {
    margin-top: 40px;
  }
}
</style>
