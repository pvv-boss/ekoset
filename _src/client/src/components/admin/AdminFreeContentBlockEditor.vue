<template>
  <div class="brc-text-editor_simple">
    <vue-editor
      v-model="content"
      @input="onEditorChange"
      :editorOptions="editorSettings"
      class="brc-vue-editor"
      :id="id"
    ></vue-editor>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class AdminFreeContentBlockEditor extends Vue {
  @Prop()
  private value

  @Prop()
  private id

  private content: string = this.value

  private editorSettings = {
    theme: 'snow',
    scrollingContainer: `#${this.id}`,
    modules: {
      imageResize: {
        modules: ['Resize', 'DisplaySize']
      }
      //  videoResize: {
      //    modules: ['Resize', 'DisplaySize'],
      //    tagName: 'iframe'
      //  },
      // imageDrop: true
    }
  }

  private onEditorChange () {
    this.$emit('input', this.content)
  }

}
</script>


<style lang="scss">
@import '@/styles/variables.scss';
</style>