<template>
  <ul class="brc-breadcrumb">
    <li v-for="(bread, idx) in breadCrumbs" :key="idx">
      <nuxt-link
        v-if="bread.link !== ''"
        :to="{name: bread.link, params: bread.params}"
      >{{bread.name}}</nuxt-link>
      <span v-else>{{bread.name}}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'

@Component({
})
export default class BreadCrumbs extends Vue {
  @Prop()
  private breadCrumbs

}
</script>

<style lang="scss">
.brc-breadcrumb {
  margin: 0 0 15px;
  li {
    display: inline;
    list-style-type: none;

    &:before {
      content: " > ";
      padding: 0 5px;
      color: lightgray;
    }
    &:first-child:before {
      content: none;
    }

    span {
      color: grey;
    }
  }
}
</style>


