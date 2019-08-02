<template>
  <section>
    <h1 itemprop="headline name">Индивидуальные предложения</h1>
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
export default class BusinessTypeOffers extends Vue {
  private head () {
    return { title: 'Экосеть: Индивидуальные предложения' }
  }
}
</script>
