<template>
  <div>Услуга</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class ServiceListItem extends Vue {
  @Prop()
  private serviceItem
}
</script>



