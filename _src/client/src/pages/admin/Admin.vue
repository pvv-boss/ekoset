<template>
  <div>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <div>Управление сайтом</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import LoginForm from '@/components/user/LoginForm.vue'
import { NuxtContext } from 'vue/types/options'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import BreadCrumbs from '@/components/BreadCrumbs.vue'

@Component({
  components: {
    LoginForm,
    BreadCrumbs
  }
})
export default class Login extends Vue {
  private appStore = getModule(AppStore, this.$store)
  private breadCrumbList: any[] = []

  private layout () {
    return 'admin'
  }
  private get mode (): string {
    return this.$route.params.mode
  }

  private mounted () {
    this.configBreadCrumbs()
  }

  private configBreadCrumbs () {
    this.breadCrumbList = []
    this.breadCrumbList.push({ name: 'Администрирование', link: 'admin' })
  }
}
</script>
