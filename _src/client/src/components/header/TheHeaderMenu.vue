<template>
  <ul
    class="brc-page-header__main-menu"
    :class="{ 'brc-main-menu_active': isMainMenuActive === true }"
  >
    <template v-for="iterMenuItem in sitePageItems">
      <li
        :key="iterMenuItem.sitePageId"
        v-if="iterMenuItem.sitePageCode !==7 && isMenuItemEnablede(iterMenuItem)"
      >
        <nuxt-link
          :to="{name: !!iterMenuItem.sitePageRouteName ? iterMenuItem.sitePageRouteName : 'main', 
              params: 
                {
                  siteSection: !!iterMenuItem.sitePageRouteName ? getCurrentSiteSection : null,
                  page: iterMenuItem.sitePageUrl
                }
              }"
          :class="{active: activeIndex === iterMenuItem.sitePageRouteName}"
        >{{iterMenuItem.sitePageName}}</nuxt-link>
      </li>
      <ThePriceMenuItem
        :key="iterMenuItem.sitePageId"
        v-if="iterMenuItem.sitePageCode ===7 && isMenuItemEnablede(iterMenuItem)"
      ></ThePriceMenuItem>
    </template>
  </ul>
</template>


<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import { getServiceContainer } from '@/api/ServiceContainer'
import SitePage, { SitePageType } from '@/models/SitePage'
import ThePriceMenuItem from '@/components/header/ThePriceMenuItem.vue'


@Component({
  components: {
    ThePriceMenuItem
  }
})
export default class TheHeaderMenu extends Vue {
  public isMainMenuActive = false
  public sitePageItems: SitePage[] = []

  private get activeIndex () {
    return this.$route.name ? this.$route.name.split('-')[0] : ''
  }

  public get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSection
  }

  public isMenuItemEnablede (pageMenuItem: SitePage) {
    const currentSiteSectionId = !!this.getCurrentSiteSection ? getServiceContainer().topMenuService.getIdBySlug(this.getCurrentSiteSection) : null
    return pageMenuItem.sitePageId !== SitePageType.MAIN && pageMenuItem.sitePageStatus === 1 && (pageMenuItem.siteSectionId === currentSiteSectionId || !pageMenuItem.siteSectionId)
  }

  public async created () {
    let menuItems = await getServiceContainer().topMenuService.adminGetSitePages()
    menuItems = [...menuItems,]

    this.sitePageItems = await getServiceContainer().topMenuService.adminGetSitePages()
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/typography.scss';

$menu_item_padding: 12px;

.brc-page-header__main-menu {
  text-transform: uppercase;
  margin: 0;
  > li {
    > a {
      color: $text-color;
      font-size: 0.938rem;
      &:hover {
        color: $red;
      }
      &.active {
        color: $red;
        font-weight: $font-medium;
        border-bottom: 2px solid $red;
      }
      //  letter-spacing: -0.1px;
    }

    display: inline-block;
    list-style-type: none;
  }

  > li {
    padding-right: $menu_item_padding;
    @media (max-width: 1024px) {
      padding-left: 0px;
      padding-right: $menu_item_padding - 5px;
    }
  }
}
</style>