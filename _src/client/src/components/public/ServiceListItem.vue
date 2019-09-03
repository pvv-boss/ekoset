<template>
  <section class="brc-service-smallitem">
    <nuxt-link
      :to="{ name: 'service-card', params: { service: serviceItem.businessServiceUrl, siteSection: getCurrentSiteSection}}"
      class="brc-service-link"
    >
      <h4>{{serviceItem.businessServiceName}}</h4>
      <figure>
        <img
          :alt="serviceItem.businessServiceName"
          itemprop="image"
          :src="serviceItem.businessServiceImgSmall"
        />
        <figcaption>{{serviceItem.businessServiceName}}</figcaption>
      </figure>
    </nuxt-link>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import BusinessService from '@/models/ekoset/BusinessService'

@Component({})
export default class ServiceListItem extends Vue {
  @Prop()
  private serviceItem: BusinessService


  public get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSection
  }
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";
.brc-service-smallitem {
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 15px;
  margin: 15px;
  flex: 1;
  min-width: 250px;

  &:hover {
    border: 1px solid red;
    box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.12);
    h4 {
      color: red;
    }
  }

  .brc-service-link {
    display: flex;
    flex-direction: row;
  }
  h4 {
    flex-grow: 1;
    margin: auto;
    color: $text-color;
  }

  img {
    max-width: 90px;
  }
}
</style>

