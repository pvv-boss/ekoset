<template>
  <div class="brc-service-relation-by-section_wrapper">
    <div
      v-for="iterItem in serviceRelationItems"
      :key="iterItem.siteSectionId"
      class="brc-service-relation-by-section"
    >
      <h4>{{ iterItem.siteSectionName }}</h4>
      <vue-good-table
        :columns="headerFields"
        :rows="iterItem.services"
        :sort-options="{
          enabled: false,
        }"
      >
        >
        <template #table-row="props">
          <input
            v-if="props.column.field == 'businessServiceId'"
            type="checkbox"
            :value="props.row.businessServiceId"
            :checked="props.row.hasRelation"
            :disabled="disabled"
            @change="
              onChecked(props.row.businessServiceId, $event.target.checked)
            "
          />
          <span v-else>{{ props.formattedRow[props.column.field] }}</span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BusinessServiceService from '@/api/BusinessServiceService'

@Component({})
export default class AdminServiceRelationListBySection extends Vue {
  @Prop()
  private serviceRelationItems

  @Prop({ type: Boolean, default: false })
  private disabled


  private headerFields = [
    {
      field: 'businessServiceId',
      label: ''
    },
    {
      field: 'businessServiceName',
      label: 'Наименование',
      tdClass: this.tdClassFunc
    },
    {
      field: 'service_parent_id',
      hidden: true
    }
  ]

  private tdClassFunc (row) {
    if (row.service_parent_id === null) {
      return 'root-service-related-class'
    } else {
      return 'child-service-related-class'
    }
  }

  private serviceListBySection (sectionPart) {
    return sectionPart.services
  }

  private layout () {
    return 'admin'
  }

  private onChecked (businessServiceId: number, hasRelation: boolean) {
    this.$emit('servicechecked', businessServiceId, hasRelation)
  }
}
</script>

<style lang="scss">
.brc-service-relation-by-section_wrapper {
  font-size: 15px !important;
  color: #363636 !important;
  > div + div {
    margin-top: 20px;
  }
}

.brc-service-relation-by-section {
  font-size: 15px !important;
  color: #363636 !important;
}

.root-service-related-class {
  font-weight: 500;
  font-size: 15px !important;
  color: #222 !important;
}

.child-service-related-class {
  font-size: 15px !important;
  color: #363636 !important;
  padding-left: 25px !important;
}
</style>

