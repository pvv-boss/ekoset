<template>
  <div>
    <ul class="navigaton">

       :key="idx" Это есть в мете разве? 
      
      <li v-for="(bread, idx) in breadCrumbList" :key="idx">
        <nuxt-link
          v-if="bread.link !== ''"
          :to="{name: bread.link}"
        >{{getBreadCrumbName(bread.name)}}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import { returnStatement } from '@babel/types' Это зачем ?
import { getServiceContainer } from '@/api/ServiceContainer'

@Component({
})
export default class BreadCrumbs extends Vue {
  private breadCrumbList = []

  private getBreadCrumbName (bc) {
    Со стрелочной функцией это будет работать ?
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

