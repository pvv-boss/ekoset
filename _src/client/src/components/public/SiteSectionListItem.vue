<template>
  <section class="brc-site-section-smallitem">
    <nuxt-link
      :to="{
        name: 'activity-card',
        params: { siteSection: siteSectionItem.siteSectionUrl },
      }"
      class="brc-site-section-link"
    >
      <h4>{{ siteSectionItem.siteSectionName }}</h4>
      <figure>
        <img
          :alt="siteSectionItem.siteSectionName"
          itemprop="image"
          :src="imageSrc"
          class="brc-site-section-img"
        />
        <figcaption>{{ siteSectionItem.siteSectionName }}</figcaption>
      </figure>
    </nuxt-link>
  </section>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import SiteSection from '@/models/ekoset/SiteSection';

@Component({})
export default class SiteSectionListItem extends Vue {
  @Prop()
  private siteSectionItem: SiteSection

  @Prop()
  private imageSrcForDesignMode: string

  private get imageSrc () {
    return this.imageSrcForDesignMode ? this.imageSrcForDesignMode : this.siteSectionItem.siteSectionImgSmall
  }
}
</script>

<style lang="scss">
.brc-site-section-smallitem {
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 15px;
  margin: 15px;
  flex: 1;
  min-width: 270px;

  &:hover {
    border: 1px solid red;
    box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.12);
    h4 {
      color: red;
    }
  }

  .brc-site-section-link {
    display: flex;
    flex-direction: row;
  }
  h4 {
    flex-grow: 1;
    margin: auto;
    color: $text-color;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  img {
    max-width: none;
    height: 90px;
  }
}

@media (max-width: 768px) {
  .brc-site-section-smallitem {
    margin: 15px 15px 0 !important;
  }
}
</style>

