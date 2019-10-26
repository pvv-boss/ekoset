<template>
  <footer class="brc-admin_page__footer"></footer>
</template>


<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import BusinessService from '@/models/ekoset/BusinessService'
import { getServiceContainer } from '@/api/ServiceContainer'

@Component({
})
export default class TheAdminLayoutFooter extends Vue {

}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.brc-admin_page__footer {
  height: 30px;
  display: none;
}
</style>