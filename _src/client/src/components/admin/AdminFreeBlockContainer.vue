<template>
  <div class="brc_admin-freeblock-container">
    <span class="brc_admin-freeblock-container__help">
      <i>(Для измнения порядка следования перетащите блок)</i>
    </span>
    <draggable v-model="dynamicComponentInfoListState" @start="drag=true" @end="drag=false">
      <div v-for="iterComponentInfo in dynamicComponentInfoListState" :key="iterComponentInfo.id">
        <AdminFreeBlockItem :dynamicComponentInfo="iterComponentInfo"></AdminFreeBlockItem>
      </div>
    </draggable>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import AdminFreeBlockItem from '@/components/admin/AdminFreeBlockItem.vue'

@Component({
  components: {
    AdminFreeBlockItem
  }
})
export default class AdminFreeBlockContainer extends Vue {

  @Prop()
  private dynamicComponentInfoList

  private dynamicComponentInfoListState = this.dynamicComponentInfoList


}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.brc_admin-freeblock-container {
  display: flex;
  flex-direction: column;
  margin-top: -10px;

  .brc_admin-freeblock-item {
    margin-top: 10px;
  }

  .brc_admin-freeblock-container__help {
    font-size: 0.78rem;
    line-height: 18px;
    letter-spacing: 0.48px;
    margin-bottom: 5px;
  }
}
</style>  