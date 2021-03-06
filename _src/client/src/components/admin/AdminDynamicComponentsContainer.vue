<template>
  <div class="brc_admin-freeblock-container">
    <b-field
      label="Управление блоками"
      style="margin-top: 15px; display: flex; flex-direction: column"
    >
      <b-button
        v-show="!createNewBlockMode"
        type="is-primary"
        outlined
        @click="createNewBlockMode = true"
        >Создать блок-конструктор</b-button
      >

      <div
        v-if="createNewBlockMode"
        class="brc-admin-card-create-row"
        style="gap: 0px"
      >
        <b-input
          v-model="newComponentInfo.dispalyName"
          placeholder="Наименование"
          type="text"
          required
          validation-message="Наименование не может быть пустым"
          style="width: 270px"
        ></b-input>
        <b-button
          type="is-primary"
          size="is-small"
          style="margin-left: auto"
          @click="saveNewBlock"
        >
          <b-icon icon="check"></b-icon>
        </b-button>
        <b-button
          size="is-small"
          style="margin-left: 5px"
          @click="cancelSaveNewBlock"
        >
          <b-icon icon="cancel"></b-icon>
        </b-button>
      </div>
    </b-field>

    <span class="brc_admin-freeblock-container__help">
      <i>(Для измнения порядка следования перетащите блок)</i>
    </span>

    <draggable v-model="dynamicComponentInfoListState" @change="handleChange">
      <div
        v-for="iterComponentInfo in dynamicComponentInfoListState"
        :key="iterComponentInfo.id + iterComponentInfo.dispalyName"
      >
        <LazyAdminFreeBlockItem
          :dynamic-component-info="iterComponentInfo"
          @componentinfo:edit="freeBlockEdit(iterComponentInfo)"
          @componentinfo:status:changed="blockStatusChanged(iterComponentInfo)"
          @componentinfo:delete="deleteBlock(iterComponentInfo)"
        ></LazyAdminFreeBlockItem>
      </div>
    </draggable>

    <b-modal
      :active.sync="isCardModalActive"
      scroll="keep"
      trap-focus
      aria-role="dialog"
      aria-modal
      width="100%"
    >
      <LazyAdminFreeBlockInfoEditor
        :dynamic-component-info="editableComponentInfo"
      ></LazyAdminFreeBlockInfoEditor>
      <b-button
        class="button"
        type="button"
        style="float: right; margin: 20px; margin-right: 330px"
        @click="closeFreeBlockEditModal"
        >Сохранить и закрыть</b-button
      >
    </b-modal>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'

import DynamicComponentInfo from '@/models/DynamicComponentInfo'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import { ServiceRegistry } from '@/ServiceRegistry'
import DynamicComponentsService from '@/services/DynamicComponentsService'

@Component({
  components: {
    draggable: () => import(/* webpackChunkName: "vuedraggable" */ 'vuedraggable')
  }
})
export default class AdminDynamicComponentsContainer extends Vue {
  @Prop()
  private value

  private dynamicComponentInfoListState: DynamicComponentInfo[] = []

  private editableComponentInfo: DynamicComponentInfo = new DynamicComponentInfo()

  private editableComponentInfoState: DynamicComponentInfo = new DynamicComponentInfo()


  private newComponentInfo: DynamicComponentInfo = new DynamicComponentInfo()

  private isCardModalActive = false

  private createNewBlockMode = false

  @Watch('value', { immediate: true })
  private async componentInfoListChanged () {
    this.dynamicComponentInfoListState = this.value
  }

  private created () {
    this.createNewComponentInfo()
    this.createNewEditableComponentInfo()
  }

  private handleChange () {
    for (let i = 0; i < this.dynamicComponentInfoListState.length; i++) {
      this.dynamicComponentInfoListState[i].visibleIndex = i;
    }
    this.$emit('input', this.dynamicComponentInfoListState)
    this.fireSaveComponentsEvent()
  }

  private freeBlockEdit (blockInfo: DynamicComponentInfo) {
    this.editableComponentInfoState = blockInfo
    this.editableComponentInfo = new DynamicComponentInfo()
    this.editableComponentInfo.id = blockInfo.id
    this.editableComponentInfo.head = blockInfo.head
    this.editableComponentInfo.dispalyName = blockInfo.dispalyName
    this.editableComponentInfo.props = {}
    this.editableComponentInfo.props.leftBlock = blockInfo.props.leftBlock
    this.editableComponentInfo.props.rightBlock = blockInfo.props.rightBlock

    this.isCardModalActive = true
  }

  private closeFreeBlockEditModal () {
    this.editableComponentInfoState.id = this.editableComponentInfo.id
    this.editableComponentInfoState.head = this.editableComponentInfo.head
    this.editableComponentInfoState.dispalyName = this.editableComponentInfo.dispalyName
    this.editableComponentInfoState.props.leftBlock = this.editableComponentInfo.props.leftBlock
    this.editableComponentInfoState.props.rightBlock = this.editableComponentInfo.props.rightBlock
    this.isCardModalActive = false

    this.createNewEditableComponentInfo()

    this.fireSaveComponentsEvent()
  }

  private saveNewBlock () {
    this.dynamicComponentInfoListState.push(this.newComponentInfo)
    this.fireSaveComponentsEvent()
    this.createNewComponentInfo()
    this.createNewBlockMode = false
  }

  private cancelSaveNewBlock () {
    this.createNewComponentInfo()
    this.createNewBlockMode = false
  }

  private deleteBlock (blockInfo: DynamicComponentInfo) {
    const okCallback = async () => {
      await ServiceRegistry.instance.getService(DynamicComponentsService).adminDeleteDynamicComponent(blockInfo.id)
      this.$emit('freecomponent:delete')
    }

    this.$BrcAlert(
      BrcDialogType.Warning,
      'Удалить блок-конструктор ?',
      'Подтвердите удаление',
      okCallback
    )
  }

  private blockStatusChanged (blockInfo: DynamicComponentInfo) {
    this.fireSaveComponentsEvent()
  }

  private fireSaveComponentsEvent () {
    this.$emit('freecomponent:save', this.dynamicComponentInfoListState)
  }

  private createNewComponentInfo () {
    this.newComponentInfo = new DynamicComponentInfo()
    this.newComponentInfo.dispalyName = 'Конструктор'
    this.newComponentInfo.code = 6
    this.newComponentInfo.id = 0
    this.newComponentInfo.props = {}
    this.newComponentInfo.props.leftBlock = ''
    this.newComponentInfo.props.rightBlock = ''
    this.newComponentInfo.visibleIndex = this.dynamicComponentInfoListState.length - 1

  }

  private createNewEditableComponentInfo () {
    this.editableComponentInfo = new DynamicComponentInfo()
    this.editableComponentInfo.head = ''
    this.editableComponentInfo.dispalyName = ''
    this.editableComponentInfo.props = {}
    this.editableComponentInfo.props.leftBlock = ''
    this.editableComponentInfo.props.rightBlock = ''
  }

}
</script>

<style lang="scss">
.brc_admin-freeblock-container {
  display: flex;
  flex-direction: column;
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

  .animation-content & .modal-content {
    max-width: 100% !important;
  }
}
</style>  