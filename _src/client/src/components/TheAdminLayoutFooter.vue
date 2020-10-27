<template>
  <footer class="brc-admin_page__footer"></footer>
</template>


<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class TheAdminLayoutFooter extends Vue {

}
</script>

<style lang="scss">
.brc-admin_page__footer {
  height: 30px;
  display: none;
}
</style>