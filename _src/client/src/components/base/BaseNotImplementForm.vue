<template>
  <BaseModal title="Внимание" :show-ok-cancel="false">
    <div style="margin: auto">
      <h2>{{ message }}</h2>
    </div>
  </BaseModal>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class BaseNotImplementForm extends Vue {

  @Prop({ default: 'Не реализовано!' })
  private message

}
</script>
