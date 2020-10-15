<template>
  <footer class="brc-admin_page__footer"></footer>
</template>


<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import AppStore from '@/store/AppStore'
import BusinessService from '@/models/ekoset/BusinessService'

@Component
export default class TheAdminLayoutFooter extends Vue {

}
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.brc-admin_page__footer {
  height: 30px;
  display: none;
}
</style>