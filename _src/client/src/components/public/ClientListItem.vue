<template>
  <section class="brc-client-item">
    <h4>{{clientItem.clActivityName}}</h4>
    <ul class="brc-client-item__list">
      <li v-for="iterBrand in brandsLimit()" :key="iterBrand.id">{{iterBrand.name}}</li>
    </ul>
    <a
      v-show="clientItem.allcount - maxClientsShow > 0"
      class="brc-client-item__showmore dont_outside"
      @click="$emit('more-clients-clicked', clientItem)"
    >{{moreItemsText()}}</a>
    <figure>
      <img
        :alt="clientItem.clActivityName"
        itemprop="image"
        :src="clientItem.clActivityMainClientImg"
      />
      <figcaption>{{clientItem.clActivityName}}</figcaption>
    </figure>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class ClientListItem extends Vue {
  @Prop()
  private clientItem

  private maxClientsShow = 5

  private moreItemsText () {
    return `Еще ${this.clientItem.allcount - this.maxClientsShow}`
  }

  private brandsLimit () {
    return this.clientItem.brandsList && this.clientItem.brandsList.length ? this.clientItem.brandsList.slice(0, this.maxClientsShow) : this.clientItem.brandsList
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.brc-client-item {
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 423px) {
    padding: 8px;
  }

  &:hover {
    border: 1px solid $red;
    box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.12);
  }

  h4 {
    text-align: center;
    color: $text-color;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
    @media (max-width: 500px) {
      font-size: 14px;
    }
  }

  .brc-client-item__list {
    margin-top: 10px;
    padding-top: 10px !important;
    border-top: 1px solid $red;

    li {
      padding-left: 1em !important;
      margin-top: 0 !important;
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: break-word;

      @media (max-width: 768px) {
        word-break: break-all;
      }
      @media (max-width: 500px) {
        font-size: 14px;
      }
    }
  }

  .brc-client-item__showmore {
    margin-top: 5px;
    width: max-content;
    margin-left: 1em;
    border-bottom: 1px solid $red;
    color: $red;
    @media (max-width: 500px) {
      font-size: 14px;
    }
  }

  figure {
    margin-top: auto;
  }
  img {
    width: 100%;
    height: 122px;
    object-fit: contain;
    object-position: center;
    margin-top: 15px;

    @media (max-width: 768px) {
      height: 96px;
      margin-top: 10px;
    }
  }
}
</style>

