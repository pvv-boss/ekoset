<template>
  <section class="brc-user-profile">
    <AccountMain></AccountMain>
    <ChangePassword></ChangePassword>
    <NotificationSettings></NotificationSettings>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { NuxtContext } from 'vue/types/options'
import { getModule } from 'vuex-module-decorators'

@Component
export default class UserProfile extends Vue {

}
</script>

<style lang="scss">
@import "@/styles/variables.scss";
</style>
