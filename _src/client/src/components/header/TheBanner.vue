<template>
  <section>
    <figure class="brc-page-image__wrapper" v-show="!!imageSrc">
      <img :alt="alt" itemprop="image" :src="imageSrc" class="brc-page-image" />
      <h1 v-show="!!h1" itemprop="headline name" class="brc-page-title">{{h1}}</h1>
    </figure>
    <h1 v-show="!imageSrc && !!h1" itemprop="headline name">{{h1}}</h1>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'nuxt-property-decorator'

@Component({
  components: {
  }
})
export default class TheBanner extends Vue {

  @Prop()
  private alt

  @Prop()
  private imageSrc

  @Prop()
  private h1

  @Prop()
  private figCaption

}

</script>