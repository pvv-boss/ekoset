<template>
  <section>
    <h1 itemprop="headline name">Страница услуги</h1>
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
export default class ServiceCard extends Vue {
  private head () {
    return { title: 'Экосеть: карточка услуги' }
  }
}
</script>
