<template>
  <section class="brc-body">
    <LoginForm :mode="mode"></LoginForm>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import LoginForm from '@/components/user/LoginForm.vue'
import { NuxtContext } from 'vue/types/options'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'

@Component({
  components: {
    LoginForm
  }
})
export default class Login extends Vue {
  private appStore = getModule(AppStore, this.$store)

  private head () {
    return { title: this.appStore.pageTitle }
  }
  private get mode (): string {
    return this.$route.params.mode
  }
}
</script>
