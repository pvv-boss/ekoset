<template>
  <div class="container" id="container">
    <vue-editor v-model="content" @text-change="onEditorChange" :editorOptions="editorSettings"></vue-editor>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class AdminTextBlockEditor extends Vue {
  @Prop()
  private value

  private content: string = ''

  private editorSettings = {
    modules: {
      blotFormatter: {},
      clipboard: {
        matchVisual: false
      }
    }
  }

  private onEditorChange () {
    this.$emit('input', this.content)
  }

  private mounted () {
    this.content = this.value
  }
}
</script>


<style lang="scss">
.container {
  min-width: 300px;
  //padding: 10px;
  background-color: white;
  .quill-editor {
    //height: 600px;
    overflow-y: auto;
  }
}

.ql-html {
  width: 120px !important;
  &:after {
    content: 'Исходный Html' !important;
  }
}
</style>