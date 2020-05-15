<template>
  <div class="brc-admin-card-field-list_row brc_admin-freeblock-editor">
    <b-field label="Наименование">
      <b-input placeholder="Наименование" type="text" v-model="dynamicComponentInfo.dispalyName"></b-input>
    </b-field>

    <b-field label="Заголовок H2">
      <b-input placeholder="Заголовок H2" type="text" v-model="dynamicComponentInfo.head"></b-input>
    </b-field>

    <div class="brc-admin-card-field-list_column" style="width:100%">
      <div
        class="brc-admin-editor__left"
        :class="{'editor_full_size':isRightEditorVisible===false}"
      >
        <div class="brc-admin-editor__caption">
          <span>{{leftPanelCaption}}</span>
          <b-switch
            v-if="!isRightEditorVisible"
            type="is-success"
            size="is-small"
            v-model="isRightEditorVisible"
          >Включить правый блок-конструктор</b-switch>
        </div>
        <BaseCKEditor v-model="leftBlockContent" id="leftBlockContent"></BaseCKEditor>
      </div>

      <div
        class="brc-admin-editor__right"
        :class="{'editor_full_size':isRightEditorVisible===false}"
      >
        <div class="brc-admin-editor__caption">
          <span>Правый блок-конструктор</span>
          <b-switch type="is-success" size="is-small" v-model="isRightEditorVisible">Скрыть</b-switch>
        </div>
        <BaseCKEditor v-model="rightBlockContent" id="rightBlockContent"></BaseCKEditor>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import BaseCKEditor from '@/components/base/BaseCKEditor.vue'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'


@Component({
  components: {
    BaseCKEditor
  }
})
export default class AdminFreeBlockInfoEditor extends Vue {
  @Prop()
  private dynamicComponentInfo

  private isRightEditorVisible =
    !!this.dynamicComponentInfo &&
      !!this.dynamicComponentInfo.props &&
      !!this.dynamicComponentInfo.props.rightBlock &&
      this.dynamicComponentInfo.props.rightBlock.length > 0 ? true : false

  private get leftPanelCaption () {
    return this.isRightEditorVisible ? 'Левый блок-конструктор' : 'Блок конструктор'
  }

  private get leftBlockContent () {
    return this.dynamicComponentInfo.props.leftBlock
  }

  private set leftBlockContent (content) {
    this.dynamicComponentInfo.props.leftBlock = content
  }

  private get rightBlockContent () {
    return this.dynamicComponentInfo.props.rightBlock
  }

  private set rightBlockContent (content) {
    this.dynamicComponentInfo.props.rightBlock = content
  }
}

</script>


<style lang="scss">
@import '@/styles/variables.scss';

.brc_admin-freeblock-editor {
  background-color: white;
  padding: 20px;
  margin: auto;
  max-width: 1160px;
  *.ql-editor {
    height: 480px !important;
  }

  *.ck-editor__main {
    height: 480px !important;
  }

  .ck-editor__editable {
    height: 100%;
  }

  .ck-toolbar__items {
    flex-wrap: wrap !important;
  }

  .brc-admin-editor__right,
  .brc-admin-editor__left {
    width: 50%;
    max-width: 565px;
  }

  .brc-admin-editor__left {
    &.editor_full_size {
      width: 100%;
      max-width: 1160px;
    }
  }

  .brc-admin-editor__right {
    &.editor_full_size {
      display: none;
      max-width: unset;
    }
  }

  .brc-admin-editor__caption {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    span {
      font-size: 15px;
      font-weight: 500;
    }

    .switch {
      margin-right: 0px !important;
    }
  }
}
</style>  