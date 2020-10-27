<template>
  <div class="brc-admin-card-field-list_row brc_admin-freeblock-editor">
    <b-field label="Наименование">
      <b-input
        v-model="dynamicComponentInfo.dispalyName"
        placeholder="Наименование"
        type="text"
      ></b-input>
    </b-field>

    <b-field label="Заголовок H2">
      <b-input
        v-model="dynamicComponentInfo.head"
        placeholder="Заголовок H2"
        type="text"
      ></b-input>
    </b-field>

    <div class="brc-admin-card-field-list_column" style="width: 100%">
      <div
        class="brc-admin-editor__left"
        :class="{ editor_full_size: isRightEditorVisible === false }"
      >
        <div class="brc-admin-editor__caption">
          <span>{{ leftPanelCaption }}</span>
          <b-switch
            v-if="!isRightEditorVisible"
            v-model="isRightEditorVisible"
            type="is-success"
            size="is-small"
            >Включить правый блок-конструктор</b-switch
          >
        </div>
        <LazyBaseCkEditor
          id="leftBlockContent"
          v-model="leftBlockContent"
        ></LazyBaseCkEditor>
      </div>

      <div
        class="brc-admin-editor__right"
        :class="{ editor_full_size: isRightEditorVisible === false }"
      >
        <div class="brc-admin-editor__caption">
          <span>Правый блок-конструктор</span>
          <b-switch
            v-model="isRightEditorVisible"
            type="is-success"
            size="is-small"
            >Скрыть</b-switch
          >
        </div>
        <LazyBaseCkEditor
          id="rightBlockContent"
          v-model="rightBlockContent"
        ></LazyBaseCkEditor>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'


@Component
export default class AdminFreeBlockInfoEditor extends Vue {
  @Prop()
  private dynamicComponentInfo

  private isRightEditorVisible = true

  @Watch('dynamicComponentInfo', { immediate: true })
  private onDynamicComponentInfoChanged () {
    this.isRightEditorVisible =
      !!(!!this.dynamicComponentInfo &&
        !!this.dynamicComponentInfo.props &&
        !!this.dynamicComponentInfo.props.rightBlock &&
        this.dynamicComponentInfo.props.rightBlock.length > 0)

  }

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
/*! purgecss start ignore */
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

/*! purgecss end ignore */
</style>  

