<template>
  <LoginForm :mode="mode"></LoginForm>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'

@Component({
  components: {
    LoginForm: () => import('@/components/user/LoginForm.vue')
  }
})
export default class Login extends Vue {
  private appStore = getModule(AppStore, this.$store)

  private get mode (): string {
    return this.$route.params.mode
  }
}
</script>
