<template>
  <div class="brc-letters">
    <RecommLetterListItem v-for="item in brandsList" :key="item.clBrandId" :brand="item"></RecommLetterListItem>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import RecommLetterListItem from '@/components/public/RecommLetterListItem.vue'

@Component({
  components: {
    RecommLetterListItem
  }
})
export default class RecommLetterList extends Vue {
  @Prop(Array)
  private brandsList
}
</script>

<style lang="scss">
.brc-letters {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 30px;
  grid-gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 20px;
    padding-top: 20px;
    grid-gap: 10px;
  }
}
</style>
