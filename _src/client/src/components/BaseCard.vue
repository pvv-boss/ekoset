<template>
  <section class="brc-card-wrapper">
    <header class="brc-card__header">
      <slot name="header"></slot>
    </header>
    <section class="brc-card__content">
      <slot name="content"></slot>
    </section>
    <footer class="brc-card__footer">
      <slot name="footer"></slot>
    </footer>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import RecommendationList from '@/components/public/RecommendationList.vue'
import RecommLetterList from '@/components/public/RecommLetterList.vue'
import ArticleList from '@/components/public/ArticleList.vue'
import MessageForm from '@/components/public/MessageForm.vue'

@Component({
  components: {
    ArticleList,
    RecommendationList,
    RecommLetterList,
    MessageForm
  }
})
export default class BaseCard extends Vue {}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.brc-card-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: $box-shadow;
  background-color: white;

  .brc-card__header {
    border-bottom: 1px solid #ccc;
    padding: 1rem;

    .brc-card__header__toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      > button {
        font-size: 14px;
      }
    }
  }

  .brc-card__content {
    flex-grow: 1;
    // margin-top: 15px;
    padding: 1rem;
  }
}
</style>