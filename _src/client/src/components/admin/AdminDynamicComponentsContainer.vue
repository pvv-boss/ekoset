<template>
  <div class="brc_admin-freeblock-container">
    <span class="brc_admin-freeblock-container__help">
      <i>(Для измнения порядка следования перетащите блок)</i>
    </span>
    <draggable v-model="dynamicComponentInfoListState" @change="handleChange">
      <div v-for="iterComponentInfo in dynamicComponentInfoListState" :key="iterComponentInfo.id">
        <AdminFreeBlockItem
          :dynamicComponentInfo="iterComponentInfo"
          @componentinfo:edit="freeBlockEdit(iterComponentInfo)"
        ></AdminFreeBlockItem>
      </div>
    </draggable>

    <b-modal
      :active.sync="isCardModalActive"
      scroll="keep"
      trap-focus
      aria-role="dialog"
      aria-modal
      :width="1120"
    >
      <AdminFreeBlockInfoEditor :dynamicComponentInfo="editableComponentInfo"></AdminFreeBlockInfoEditor>
      <b-button
        class="button"
        type="button"
        @click="closeFreeBlockEditModal"
        style="float:right;margin:20px;"
      >Закрыть</b-button>
    </b-modal>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import AdminFreeBlockItem from '@/components/admin/AdminFreeBlockItem.vue'
import AdminFreeBlockInfoEditor from '@/components/admin/AdminFreeBlockInfoEditor.vue'

import DynamicComponentInfo from '@/models/DynamicComponentInfo'


@Component({
  components: {
    AdminFreeBlockItem,
    AdminFreeBlockInfoEditor
  }
})
export default class AdminDynamicComponentsContainer extends Vue {
  @Prop()
  private value

  private dynamicComponentInfoListState: DynamicComponentInfo[] = this.value

  private editableComponentInfo: DynamicComponentInfo = new DynamicComponentInfo()

  private isCardModalActive = false

  private handleChange () {
    for (let i = 0; i < this.dynamicComponentInfoListState.length; i++) {
      this.dynamicComponentInfoListState[i].visibleIndex = i;
    }
    this.$emit('input', this.dynamicComponentInfoListState)
  }

  private freeBlockEdit (blockInfo: DynamicComponentInfo) {
    this.editableComponentInfo = blockInfo
    this.isCardModalActive = true
  }

  private closeFreeBlockEditModal () {
    this.isCardModalActive = false
    this.editableComponentInfo = new DynamicComponentInfo()
  }

}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.brc_admin-freeblock-container {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #ccc;
  max-width: 400px;
  background-color: white;

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