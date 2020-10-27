<template>
  <section class="brc-user-profile">
    <AccountMain></AccountMain>
    <ChangePassword></ChangePassword>
    <NotificationSettings></NotificationSettings>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class UserProfile extends Vue {

}
</script>

<style lang="scss">
</style>
