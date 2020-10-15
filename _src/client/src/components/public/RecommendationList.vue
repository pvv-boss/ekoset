<template>
  <div>
    <div class="brc-recommendations">
      <LazyRecommendationListItem
        v-for="iterBrand in brandShowList"
        :key="iterBrand.clBrandId"
        :brand="iterBrand"
      ></LazyRecommendationListItem>
    </div>
    <div v-show="!allBrandsPage" class="brc-all-brands-link__wrapper">
      <nuxt-link
        :to="{
          name: 'clients',
          params: { siteSection: getCurrentSiteSection },
        }"
        class="brc-all-brands-link"
        >Все рекомендации</nuxt-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ClBrand from '@/models/ekoset/ClBrand'
import { getModule } from 'vuex-module-decorators'
import AppStore from '@/store/AppStore'

@Component
export default class RecommendationList extends Vue {
  @Prop(Array)
  private brandList

  @Prop({ default: false })
  private allBrandsPage

  // private isMobile: boolean = false

  public get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSection
  }

  private get brandShowList () {
    return this.brandList
    // return !this.allBrandsPage ? this.brandList.slice(0, this.isMobile ? 4 : 12) : this.brandList
  }

  // private mounted () {
  //   const bodyElement = document.getElementsByTagName('body')[0]
  //   if (bodyElement && bodyElement.offsetWidth < 768) {
  //     this.isMobile = true
  //   }
  // }
}
</script>

<style lang="scss">
.brc-recommendations {
  margin: 30px 0 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);

  // grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-gap: 16px;
}

@media (max-width: 768px) {
  .brc-recommendations {
    grid-template-columns: repeat(3, 1fr);
    // grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    grid-gap: 10px;
  }
}

.brc-all-brands-link__wrapper {
  margin-top: 30px;

  .brc-all-brands-link {
    border: 1px solid red;
    color: red;
    text-decoration: none;
    width: 200px;
    max-width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin: auto;

    &:hover {
      background-color: red;
      color: white;
    }
  }
}
</style>
