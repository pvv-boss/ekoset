<template>
  <header class="brc-admin_page__header">
    <svg
      data-v-49e15297
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      class="brc-admin-humburger"
      :class="{active:sidebaropen}"
      @click="humburgecClick"
    >
      <path
        data-v-49e15297
        d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
      />
    </svg>
    <BreadCrumbs :breadCrumbs="breadCrumbList" class="admin-breadcrumbs"></BreadCrumbs>
  </header>
</template>


<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import AdminStore from '@/store/AdminStore'
import { getModule } from 'vuex-module-decorators'
import BusinessService from '@/models/ekoset/BusinessService'
import { getServiceContainer } from '@/api/ServiceContainer'
import BreadCrumbs from '@/components/BreadCrumbs.vue'

@Component({
  components: {
    BreadCrumbs
  }
})
export default class TheAdminLayoutHeader extends Vue {
  private breadCrumbList: any[] = []
  private sidebaropen = true

  private get getStoreBreadCrumbList() {
    return getModule(AdminStore, this.$store).breadCrumbList
  }

  @Watch('getStoreBreadCrumbList', { immediate: true })
  private configBreadCrumbs() {
    this.breadCrumbList = this.getStoreBreadCrumbList
  }
  private humburgecClick() {
    this.sidebaropen = !this.sidebaropen
    this.$emit('humburger:open', this.sidebaropen)
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.brc-admin_page__header {
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid $delimiter-light-color;
  // justify-content: center;

  .admin-breadcrumbs {
    margin: 0px !important;
    // margin-left: 30px !important;
    margin-left: auto !important;
    padding-bottom: 5px;
  }
}

.brc-admin-humburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  transform: none;
  &.active {
    transform: rotate(180deg);
  }
}
</style>