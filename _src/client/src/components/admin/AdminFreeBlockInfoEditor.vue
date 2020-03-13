<template>
  <div class="brc-admin-card-field-list_row brc_admin-freeblock-editor">
    <b-field label="Наименование">
      <b-input placeholder="Наименование" type="text" v-model="dynamicComponentInfo.dispalyName"></b-input>
    </b-field>

    <b-field label="Заголовок H2">
      <b-input placeholder="Заголовок H2" type="text" v-model="dynamicComponentInfo.head"></b-input>
    </b-field>

    <div class="brc-admin-card-field-list_column">
      <b-field label="Левый блок-конструктор" class="col-2">
        <AdminFreeContentBlockEditor v-model="leftBlockContent" id="leftBlockContent"></AdminFreeContentBlockEditor>
      </b-field>
      <b-field label="Правый блок-конструктор" class="col-2">
        <AdminFreeContentBlockEditor v-model="rightBlockContent" id="rightBlockContent"></AdminFreeContentBlockEditor>
      </b-field>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
// import AdminFreeBlockItem from '@/components/admin/AdminFreeBlockItem.vue'
import AdminFreeContentBlockEditor from '@/components/admin/AdminFreeContentBlockEditor.vue'
import DynamicComponentInfo from '@/models/DynamicComponentInfo'


@Component({
  components: {
    // AdminFreeBlockItem,
    AdminFreeContentBlockEditor
  }
})
export default class AdminFreeBlockInfoEditor extends Vue {
  @Prop()
  private dynamicComponentInfo

  private dynamicComponentInfoState = this.dynamicComponentInfo

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

  max-width: 1200px;
  *.ql-editor {
    height: 480px !important;
  }
}
</style>  