<template>
  <ul class="brc-breadcrumb">
    <li v-for="(bread, idx) in breadCrumbList" :key="idx">
      <nuxt-link v-if="bread.link !== ''" :to="{name: bread.link}">{{getBreadCrumbName(bread.name)}}</nuxt-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'

@Component({
})
export default class BreadCrumbs extends Vue {
  private breadCrumbList = []

  private getBreadCrumbName (bc) {
    return typeof bc === 'function' ? bc(this.$route) : bc;
  }

  @Watch('$route.meta.breadcrumb')
  private async changeBreadCrumb (val) {
    this.breadCrumbList = this.$route.meta.breadcrumb
  }

  private mounted () {
    this.breadCrumbList = this.$route.meta.breadcrumb
  }
}
</script>

<style lang="scss">
.brc-breadcrumb {
  li {
    display: inline;
    list-style-type: none;

    &:before {
      content: ">";
    }
    &:first-child:before {
      content: none;
    }
  }
}
</style>


