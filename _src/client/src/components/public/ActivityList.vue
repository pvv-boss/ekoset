<template>
  <div>
    <ActivityListItem
      v-for="activityItem in activityList"
      :key="activityItem.activityId"
      :activityItem="activityItem"
    ></ActivityListItem>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ActivityListItem from '@/components/public/ActivityListItem.vue'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import { importDeclaration } from '@babel/types'

@Component({
  components: {
    ActivityListItem
  }
})
export default class ActivityList extends Vue {
  @Prop(Array)
  private activityList
}
</script>