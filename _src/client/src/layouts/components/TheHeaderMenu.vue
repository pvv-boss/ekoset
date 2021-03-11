<template>
  <ul ref="mainmenu" class="brc-page-header__main-menu">
    <template v-for="iterMenuItem in sitePageItems">
      <li
        v-if="iterMenuItem.sitePageCode !== 7 && isMenuItemEnablede(iterMenuItem)"
        :ref="'menuitem' + isMobile + iterMenuItem.sitePageId"
        :key="isMobile + iterMenuItem.sitePageId"
        :style="
          (iterMenuItem.sitePageCode !== 7 && iterMenuItem.visibleInHorMenu) || isMobile
            ? 'visibility:visible'
            : 'position:absolute; visibility: hidden'
        "
      >
        <nuxt-link
          :to="{
            name: !!iterMenuItem.sitePageRouteName ? iterMenuItem.sitePageRouteName : 'main',
            params: {
              siteSection: !!iterMenuItem.sitePageRouteName ? getCurrentSiteSection : null,
              page: iterMenuItem.sitePageUrl,
            },
          }"
          :class="{ active: isActiveIndex(iterMenuItem) }"
          >{{ iterMenuItem.sitePageName }}</nuxt-link
        >
      </li>
      <ThePriceMenuItem
        v-if="iterMenuItem.sitePageCode === 7 && isMenuItemEnablede(iterMenuItem)"
        :ref="'menuitem' + isMobile + iterMenuItem.sitePageId"
        :key="isMobile + iterMenuItem.sitePageId"
        :style="
          (iterMenuItem.sitePageCode === 7 && iterMenuItem.visibleInHorMenu) || isMobile
            ? 'visibility:visible'
            : 'position:absolute; visibility: hidden'
        "
      ></ThePriceMenuItem>
    </template>

    <li v-if="!isMobile && additionalsitePageItems.length > 0" class="brc-page-header__main-menu_add-wrapper">
      <div
        id="dont_outside"
        v-click-outside="
          () => {
            isMenuOpened = false;
          }
        "
        class="brc-page-header__main-menu_add-wrapper_expander"
        @click="onClick"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul class="brc-price-menu" :class="{ active: isMenuOpened === true }" style="margin-top: 8px">
        <template v-for="iterMenuItem in additionalsitePageItems">
          <li
            v-if="iterMenuItem.sitePageCode !== 7 && isMenuItemEnablede(iterMenuItem)"
            :ref="'addmenuitem' + isMobile + iterMenuItem.sitePageId"
            :key="isMobile + iterMenuItem.sitePageId"
            class="brc-page-header__main-menu_add-wrapper__item"
            style="padding: 10px !important"
          >
            <nuxt-link
              :to="{
                name: !!iterMenuItem.sitePageRouteName ? iterMenuItem.sitePageRouteName : 'main',
                params: {
                  siteSection: !!iterMenuItem.sitePageRouteName ? getCurrentSiteSection : null,
                  page: iterMenuItem.sitePageUrl,
                },
              }"
              :class="{ active: isActiveIndex(iterMenuItem) }"
              >{{ iterMenuItem.sitePageName }}</nuxt-link
            >
          </li>
        </template>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "nuxt-property-decorator";
import AppStore from "@/store/AppStore";
import { getModule } from "vuex-module-decorators";
import SitePage, { SitePageType } from "@/models/SitePage";
import { ServiceRegistry } from "@/ServiceRegistry";
import TopMenuService from "@/services/TopMenuService";

@Component
export default class TheHeaderMenu extends Vue {
  @Prop({ default: false })
  public isMobile: boolean;

  public sitePageItems: SitePage[] = [];

  public additionalsitePageItems: SitePage[] = [];

  public isMenuOpened = false;

  @Watch("$route.params", { immediate: true })
  public onRouteChanged() {
    if (!this.isMobile) {
      this.modifyMenuItemsVisible();
    }
  }

  public onClick() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  public get getCurrentSiteSection() {
    return getModule(AppStore, this.$store).currentSiteSection;
  }

  public isActiveIndex(menuItem: SitePage) {
    const routeName = this.$route.name;
    if (routeName === "custom-page") {
      return this.$route.params.page === menuItem.sitePageUrl;
    } else {
      return routeName === menuItem.sitePageRouteName;
    }
  }

  public isMenuItemEnablede(pageMenuItem: SitePage) {
    const currentSiteSectionId = this.getCurrentSiteSection
      ? ServiceRegistry.instance.getService(TopMenuService).getIdBySlug(this.getCurrentSiteSection)
      : null;
    if (pageMenuItem.sitePageId === SitePageType.MAIN && this.isMobile) {
      return true;
    }
    return (
      pageMenuItem.sitePageId !== SitePageType.MAIN &&
      pageMenuItem.sitePageStatus === 1 &&
      (pageMenuItem.siteSectionId === currentSiteSectionId || !pageMenuItem.siteSectionId)
    );
  }

  public async fetch() {
    const sitePageItems = await ServiceRegistry.instance.getService(TopMenuService).adminGetSitePages();

    sitePageItems.forEach((element: any) => {
      element.visibleInHorMenu = true;
    });

    this.sitePageItems = sitePageItems;
  }

  public async mounted() {
    this.$nextTick(() => {
      if (!this.isMobile) {
        window.removeEventListener("resize", this.modifyMenuItemsVisible);
        window.addEventListener("resize", this.modifyMenuItemsVisible);
        this.modifyMenuItemsVisible();
      }
    });
  }

  public beforDestroy() {
    window.removeEventListener("resize", this.modifyMenuItemsVisible);
  }

  private modifyMenuItemsVisible() {
    const menuOl = this.$refs.mainmenu as HTMLElement;

    if (menuOl) {
      const menuOffsetWidth = menuOl.offsetWidth;
      const menuItemsToRelocate: SitePage[] = [];
      const delta = this.additionalsitePageItems.length > 1 ? 65 : this.additionalsitePageItems.length === 1 ? 55 : 20;

      let aggMenuItemWidth = 0;

      this.sitePageItems.forEach((iterItem) => {
        if (this.isMenuItemEnablede(iterItem)) {
          const elWidth = this.getMenuItemOffsetWidth(iterItem);
          if (elWidth) {
            aggMenuItemWidth = aggMenuItemWidth + elWidth + 10;

            if (aggMenuItemWidth > menuOffsetWidth - delta) {
              menuItemsToRelocate.push(iterItem);
              iterItem.visibleInHorMenu = false;
            } else {
              iterItem.visibleInHorMenu = true;
            }
          }
        }
      });
      this.additionalsitePageItems = [...menuItemsToRelocate];
    }
  }

  private getMenuItemOffsetWidth(iterItem: SitePage) {
    const iterDomElement = this.$refs["menuitem" + this.isMobile + iterItem.sitePageId];
    if (!!iterDomElement && Array.isArray(iterDomElement) && iterDomElement.length > 0) {
      return (iterDomElement[0] as HTMLElement).offsetWidth;
    }
  }
}
</script>

<style lang="scss">
$menu_item_padding: 12px;

.brc-page-header__main-menu {
  width: 100%;
  // overflow: hidden;
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

  .brc-page-header__main-menu_add-wrapper {
    position: relative;
    text-transform: uppercase;
    &:hover {
      color: $red;
      cursor: pointer;
    }
    li {
      a {
        color: $text-color;
        text-transform: uppercase;
        font-size: 0.9rem;
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

    .brc-page-header__main-menu_add-wrapper_expander {
      display: block;
      //  margin: 7px 0 0 12px;
      position: relative;
      height: 14px;
      width: 16px;
      margin-right: 5px;

      > span {
        background: #4b4b4b;
        display: block;
        height: 2px;
        width: 18px;
        position: absolute;
        top: 2px;
        transition: 0.5s;
      }

      > span:nth-child(2) {
        top: 8px;
      }

      > span:nth-child(3) {
        top: 14px;
      }
    }
    .brc-page-header__main-menu_add-wrapper__item {
      list-style-type: none;
      display: flex !important;
      align-items: center;
      padding: 10px;
    }

    .brc-page-header__main-menu_add-wrapper__item + .brc-page-header__main-menu_add-wrapper__item {
      border-top: 1px solid lightgray;
    }
  }
}
</style>
