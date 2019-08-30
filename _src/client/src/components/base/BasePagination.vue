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
      <li
        v-if="pages[pages.length-1]<countPage"
        @click="currentChange(pages[pages.length-1]+1)"
      >&gt;</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { returnStatement } from '@babel/types';

@Component
export default class BasePagination extends Vue {
  @Prop(Number)
  private limit

  @Prop(Number)
  private total

  @Prop(Number)
  private currentPage

  private get countPage () {
    return Math.ceil(this.total / this.limit)
  }

  private get pages () {
    const pages: number[] = new Array()

    let startPage = 1
    let endPage = this.countPage

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

<style lang="scss">
@import "@/styles/variables.scss";

.brc-pagination {
  display: block;
  width: 100%;

  ul {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    > li {
      padding: 5px;
      margin: 5px;
      width: 30px;
      height: 30px;
      background-color: #efefef;
      border: 1px solid #efefef;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      font-size: 16px;
      color: gray;
      font-weight: 300;

      &:hover {
        color: $red;
        cursor: pointer;
        border: 1px solid gray;
      }

      &.active {
        background-color: $red;
        border: 1px solid $red;
        color: #ffffff;
      }
    }
  }
}
</style>


