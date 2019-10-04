<template>
  <AdminSlotLayout>
    <template v-slot:header>
      <h1>Хедер</h1>
    </template>
    <BreadCrumbs :breadCrumbs="breadCrumbList"></BreadCrumbs>
    <div>Управление сайтом</div>
    <template v-slot:aside>
      <AdminLeftMenu></AdminLeftMenu>
    </template>
    <template v-slot:footer>
      <p>Футер: Некая контактная информация</p>
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
