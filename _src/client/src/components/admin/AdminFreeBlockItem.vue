<template>
  <div class="brc_admin-freeblock-item">
    <b-switch
      v-model="dynamicComponentInfo.visible"
      true-value="1"
      false-value="0"
      type="is-success"
      size="is-small"
      @input="$emit('componentinfo:status:changed', dynamicComponentInfo)"
    ></b-switch>
    <span style="margin-right: auto">{{
      dynamicComponentInfo.dispalyName
    }}</span>
    <b-button
      v-if="dynamicComponentInfo.code === 6"
      size="is-small"
      icon-right="pencil"
      @click="$emit('componentinfo:edit', dynamicComponentInfo)"
    ></b-button>
    <b-button
      v-if="dynamicComponentInfo.code === 6"
      size="is-small"
      icon-right="delete"
      @click="$emit('componentinfo:delete', dynamicComponentInfo)"
    ></b-button>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class AdminFreeBlockItem extends Vue {

  @Prop()
  private dynamicComponentInfo

}
</script>


<style lang="scss">
.brc_admin-freeblock-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid lightgrey;
  border-radius: 2px;
  font-size: $font-small;
  white-space: nowrap;
  padding: 10px;
  column-gap: 10px;
  -moz-column-gap: 10px;
  gap: 5px;
  -webkit-column-gap: 10px;

  cursor: move;

  > span {
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>  