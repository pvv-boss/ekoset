<template>
  <div class="container" id="container">
    <vue-editor v-model="content" @text-change="onEditorChange" :editorOptions="editorSettings"></vue-editor>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

// import hljs from 'highlight.js'

// hljs.configure({
//   languages: ['javascript', 'python']
// })

@Component
export default class AdminArticleEditor extends Vue {
  @Prop()
  private value

  private content: string = ""

  private editorSettings = {
    modules: {
      blotFormatter: {}
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
  max-width: 100%;
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
    content: "Исходный Html" !important;
  }
}
.ql-editor {
  overflow-x: hidden;
}
</style>