<template>
  <div class="">
    <label v-if="!!label" :for="id">{{ label }}</label>
    <input
      :id="id"
      :value="value"
      :aria-describedby="ariaDescribedby"
      :class="['input-rounded', classes]"
      v-bind="$attrs"
      v-on="{
        ...$listeners,
        input: (event) => $emit('input', event.target.value),
      }"
    />
    <span v-if="!!help" :id="ariaDescribedby" class="input-help">{{ help }}</span>

    <div class="input-error">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { v4 as uuidv4 } from "uuid";

@Component({
  inheritAttrs: false,
})
export default class BaseInput extends Vue {
  @Prop({ default: () => uuidv4() })
  private id: string;

  @Prop()
  private value;

  @Prop()
  private label: string;

  @Prop()
  private help: string;

  @Prop()
  private classes: string;

  private get ariaDescribedby() {
    return `${this.id}-help`;
  }
}
</script>
