<template>
  <section>
    <h1 itemprop="headline name">Клиенты</h1>
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
export default class Clients extends Vue {
  private clientItems: [] = []

  private async asyncData (context: NuxtContext) {
    //FIXME: получаем список клиентов
    const clientList = getServiceContainer().articleService.getRootArticleList()

    const data = await Promise.all([clientList])
    return {
      clientItems: data[0]
    }
  }

  private head () {
    return { title: 'Экосеть: Клиенты' }
  }
}
</script>
