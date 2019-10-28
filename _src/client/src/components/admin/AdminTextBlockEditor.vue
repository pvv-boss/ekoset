<template>
  <div class="brc-text-editor_simple">
    <vue-editor
      v-model="content"
      @text-change="onEditorChange"
      :editorOptions="editorSettings"
      class="brc-vue-editor"
      :id="id"
    ></vue-editor>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class AdminTextBlockEditor extends Vue {
  @Prop()
  private value

  @Prop()
  private id

  private content: string = ''

  private editorSettings = {
    modules: {
      blotFormatter: {}
    }
  }

  private onEditorChange() {
    this.$emit('input', this.content)
  }

  private mounted() {
    this.content = this.value
  }
}
</script>


<style lang="scss">
@import '@/styles/variables.scss';
</style>