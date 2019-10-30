<template>
  <div class="brc_admin-freeblock-container">
    <span class="brc_admin-freeblock-container__help">
      <i>(Для измнения порядка следования перетащите блок)</i>
    </span>
    <draggable v-model="dynamicComponentInfoListState" @change="handleChange">
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
import DynamicComponentInfo from '@/models/DynamicComponentInfo'

@Component({
  components: {
    AdminFreeBlockItem
  }
})
export default class AdminFreeBlockContainer extends Vue {
  @Prop()
  private value

  private dynamicComponentInfoListState: DynamicComponentInfo[] = this.value

  private handleChange () {
    for (let i = 0; i < this.dynamicComponentInfoListState.length; i++) {
      this.dynamicComponentInfoListState[i].visibleIndex = i;
    }
    this.$emit('input', this.dynamicComponentInfoListState)
  }

}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.brc_admin-freeblock-container {
  display: flex;
  flex-direction: column;
  margin-top: -10px;
  border-top: 1px solid #ccc;

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