<template>
  <section>
    <h1 itemprop="headline name">Цены</h1>
    <MessageForm></MessageForm>
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
  private head () {
    return { title: 'Экосеть: Цены' }
  }
}
</script>
