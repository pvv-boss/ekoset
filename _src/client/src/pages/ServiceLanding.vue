<template>
  <section>
    <h1 itemprop="headline name">Услуги</h1>
    <PersonalOffer></PersonalOffer>
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
import PersonalOffer from '@/components/ekoset/partials/PersonalOffer.vue'

@Component({
  components: {
    OrderForm,
    MessageForm,
    PersonalOffer
  }
})
export default class ServiceLanding extends Vue {
  private head () {
    return { title: 'Экосеть: Услуги' }
  }
}
</script>
