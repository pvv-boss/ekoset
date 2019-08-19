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
  private head () {
    return { title: 'Экосеть: Клиенты' }
  }
}
</script>
