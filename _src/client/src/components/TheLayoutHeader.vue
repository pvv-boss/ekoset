<template>
  <header class="brc-header">
    <h3>Экосеть</h3>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import UserAuthHeader from '@/components/user/UserAuthHeader.vue'

@Component({
  components: {
    UserAuthHeader
  }
})
export default class TheLayoutHeader extends Vue {
  public isAdmin = true

  private get activeIndex () {
    return this.$route.name ? this.$route.name.split('-')[0] : ''
  }
}
</script>
