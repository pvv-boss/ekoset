<template>
  <div>
    <label v-if="!!label" :for="id">{{ label }}</label>
    <input
      :id="id"
      ref="baseInputMask"
      v-imask="mask"
      type="text"
      :aria-describedby="ariaDescribedby"
      :class="['input-rounded', classes]"
      v-bind="$attrs"
      v-on="{
        ...$listeners,
        input: () => {},
      }"
      @keyup.delete="onDelete"
      @complete="onComplete"
    />
    <span v-if="!!help" :id="ariaDescribedby" class="input-help">{{
      help
    }}</span>

    <div class="input-error">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from "nuxt-property-decorator";
import { v4 as uuidv4 } from "uuid";


@Component({
  inheritAttrs: false
})
export default class BaseInputMask extends Vue {
  @Ref("baseInputMask") readonly phoneFiled!: HTMLInputElement | any;

  @Prop()
  public label: string;

  @Prop({ default: () => uuidv4() })
  public id: string;

  @Prop({ default: "" })
  public mask;

  @Prop()
  public value;

  @Prop()
  public help: string;

  @Prop()
  private classes: string;

  public get ariaDescribedby () {
    return `${this.id}-help`;
  }

  mounted () {
    if (this.value) {
      this.updateInput(this.value);
    }
  }

  public onDelete () {
    this.$emit("input", "");
  }

  public onComplete ({ detail }) {
    this.$emit("input", detail.unmaskedValue);
  }

  private updateInput (val) {
    if (this.$refs.phoneFiled) {
      this.phoneFiled.maskRef.typedValue = String(val);
    }
  }
}
</script>
