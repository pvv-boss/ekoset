<template>
  <div class="brc-letters__wrapper">
    <div class="brc-letters">
      <RecommLetterListItem
        v-for="item in recommLetterList"
        :key="item.recommId"
        :recommLetter="item"
      ></RecommLetterListItem>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import RecommLetterListItem from '@/components/public/RecommLetterListItem.vue'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'

@Component({
  components: {
    RecommLetterListItem
  }
})
export default class RecommLetterList extends Vue {
  @Prop(Array)
  private recommLetterList
}
</script>

<style lang="scss">
.brc-letters__wrapper {
  margin: 60px 0 0;
  .brc-letters {
    margin: 30px -15px 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}
</style>
