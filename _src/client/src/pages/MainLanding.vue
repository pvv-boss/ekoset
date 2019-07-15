<template>
  <section>
    <h1 itemprop="headline name">Экосеть: главная страница</h1>
    <OrderForm></OrderForm>
    <MessageForm></MessageForm>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import OrderForm from '@/components/ekoset/partials/OrderForm.vue'
import MessageForm from '@/components/ekoset/partials/MessageForm.vue'

@Component({
  components: {
    OrderForm,
    MessageForm
  }
})
export default class MainLanding extends Vue {
  private head () {
    return { title: 'Экосеть' }
  }
}
</script>
