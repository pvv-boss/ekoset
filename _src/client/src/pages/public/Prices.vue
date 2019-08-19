<template>
  <section>
    <h1 itemprop="headline name">Цены</h1>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import MessageForm from '@/components/public/MessageForm.vue'

@Component({
  components: {
    MessageForm
  }
})
export default class Prices extends Vue {
  private priceItems: [] = []

  private async asyncData (context: NuxtContext) {
    //FIXME: получение списка цен
    const priceList = getServiceContainer().articleService.getRootArticleList()

    const data = await Promise.all([priceList])
    return {
      priceItems: data[0]
    }
  }

  private head () {
    return { title: 'Экосеть: Цены' }
  }
}
</script>
