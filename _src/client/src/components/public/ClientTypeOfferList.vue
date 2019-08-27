<template>
  <section>
    <nuxt-link
      :to="{ name: 'offer-card', params: { offer: null, activity: getCurrentSiteSection, clienttype: 'business'}}"
    >
      <h3>Для бизнеса</h3>
    </nuxt-link>

    <nuxt-link
      :to="{ name: 'offer-card', params: { offer: null, activity: getCurrentSiteSection, clienttype: 'person'}}"
    >
      <h3>Для частных лиц</h3>
    </nuxt-link>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ClientTypeOfferListItem from '@/components/public/ClientTypeOfferListItem.vue'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'

@Component({
  components: {
    ClientTypeOfferListItem
  }
})
export default class ClientTypeOfferList extends Vue {
  @Prop(Array)
  private offerList

  public get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSection
  }

}
</script>