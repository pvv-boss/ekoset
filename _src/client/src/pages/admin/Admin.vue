<template>
  <AdminSlotLayout>
    <template v-slot:header>
      <nuxt-link :to="{name: 'main'}" class="brc-logo_main" id="brc-page-header-main-logo">
        <img src="/images/logo.png" alt="Экосеть" />
      </nuxt-link>
    </template>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <div>Управление сайтом</div>
    <b-field>
      <b-numberinput v-model="Counter"></b-numberinput>
    </b-field>
    <template v-slot:aside>
      <AdminLeftMenu></AdminLeftMenu>
    </template>
    <template v-slot:footer>
      <p>
        <small>@2019</small>
      </p>
    </template>
  </AdminSlotLayout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import LoginForm from '@/components/user/LoginForm.vue'
import { NuxtContext } from 'vue/types/options'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import AdminLeftMenu from '@/components/admin/AdminLeftMenu.vue'
import AdminSlotLayout from '@/layout/adminslot.vue'

@Component({
  components: {
    LoginForm,
    BreadCrumbs,
    AdminLeftMenu,
    AdminSlotLayout
  }
})
export default class Login extends Vue {
  private appStore = getModule(AppStore, this.$store)
  private breadCrumbList: any[] = []

  private Counter = 0

  private layout () {
    return 'empty'
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
