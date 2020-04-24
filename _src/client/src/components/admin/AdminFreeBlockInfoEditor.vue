<template>
  <div class="brc-admin-card-field-list_row brc_admin-freeblock-editor">
    <b-field label="Наименование">
      <b-input placeholder="Наименование" type="text" v-model="dynamicComponentInfo.dispalyName"></b-input>
    </b-field>

    <b-field label="Заголовок H2">
      <b-input placeholder="Заголовок H2" type="text" v-model="dynamicComponentInfo.head"></b-input>
    </b-field>

    <div class="brc-admin-card-field-list_column" style="width:100%">
      <b-field label="Левый блок-конструктор" style="width:50%">
        <BaseCKEditor v-model="leftBlockContent" id="leftBlockContent"></BaseCKEditor>
      </b-field>
      <b-field label="Правый блок-конструктор" style="width:50%">
        <BaseCKEditor v-model="rightBlockContent" id="rightBlockContent"></BaseCKEditor>
      </b-field>
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
  max-width: 1240px;
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
}
</style>  