<template>
  <div class="position-relative">
    <div class="d-flex justify-content-between align-items-center">
      <h2 v-if="!!title" v-html="title"></h2>

      <span
        v-if="showCloseButton"
        class="vue-dialog-close-button cursor-pointer"
        @click.prevent="$parent.$emit('close')"
      ></span>
    </div>

    <div
      v-if="!!description && !loading"
      class="vue-dialog-description"
      v-html="description"
    />

    <slot></slot>

    <div v-if="showOkCancel" class="dialog_buttons">
      <button
        class="dialog_button_ok"
        @click="
          () => {
            $emit('dialogOkClick');
          }
        "
      >
        OK
      </button>
      <button
        class="dialog_button_cancel"
        @click="
          () => {
            $emit('dialogCancelClick');
          }
        "
      >
        Отмена
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
@Component
export default class BaseModal extends Vue {
  @Prop({ default: "" })
  public title: string;

  @Prop({ default: "" })
  public description: string;

  @Prop({ default: true })
  public showCloseButton: boolean;

  @Prop({ default: false })
  public loading: boolean;

  @Prop({ default: false })
  public fullLoading: boolean;

  @Prop({ default: true })
  public showOkCancel: boolean;

}
</script>

