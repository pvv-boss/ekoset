<template>
  <div class="brc-pagination">
    <ul>
      <li v-if="pages[0]>1" @click="currentChange(pages[0]-1)">&lt;</li>
      <li
        v-for="page in pages"
        v-bind:key="page"
        @click="currentChange(page)"
        :class="{active : page === currentPage }"
      >{{page}}</li>
      <li v-if="pages[pages.length-1]<total" @click="currentChange(pages[pages.length-1]+1)">&gt;</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { returnStatement } from '@babel/types';

@Component
export default class BasePagination extends Vue {
  @Prop(Number)
  private limit

  @Prop(Number)
  private total

  @Prop(Number)
  private currentPage

  private get pages () {
    const pages: number[] = new Array()

    let startPage = 1
    let endPage = this.total

    if (this.currentPage - Math.floor(this.limit / 2) <= 1) {
      endPage = this.limit < this.total ? this.limit : this.total
    } else if (this.currentPage + Math.floor(this.limit / 2) > this.total) {
      startPage = this.total - this.limit > 1 ? this.total - this.limit : 1
    } else {
      startPage = this.currentPage - Math.floor(this.limit / 2)
      endPage = startPage + this.limit - 1
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }

  private currentChange (current: number) {
    this.$emit('update:currentPage', current)
    this.fireUpdateEvent()
  }


  private fireUpdateEvent () {
    this.$emit('update:pagination')
    window.scrollTo(0, 0)
  }
}
</script>


