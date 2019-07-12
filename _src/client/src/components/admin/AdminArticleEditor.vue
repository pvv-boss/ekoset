<template>
  <div class="container">
    <quill-editor
      ref="articleQuillEditor"
      class="quill-editor"
      :content="value"
      @change="onEditorChange($event)"
      :options="editorOptions"
    ></quill-editor>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class AdminArticleEditor extends Vue {
  @Prop()
  private value

  private toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],      // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }],          // outdent/indent
    [{ direction: 'rtl' }],                         // text direction
    [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ header: [2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
    [{ align: [] }],
    ['clean'],
    ['link', 'image', 'video']
  ]
  private editorOptions = {
    theme: 'snow',
    debug: false,
    modules: {
      toolbar: {
        container: this.toolbarOptions,
        handlers: {
          clean: this.cleanHandler
        }
      },
      imageResize: {
        displayStyles: {
          backgroundColor: 'black',
          border: 'none',
          color: 'white'
        },
        modules: ['Resize', 'DisplaySize', 'Toolbar']
      }
    }
  }

  public get editor () {
    // @ts-ignore
    return this.$refs.articleQuillEditor.quill
  }

  private cleanHandler () {
    const str = this.value
    this.value = str.replace(/\s*(style|class)=\".*?\"/gm, '')
  }

  private onEditorChange ({ editor, html, text }) {
    this.$emit('input', html)
  }
}
</script>


<style lang="scss" scoped>
.container {
  min-width: 300px;
  padding: 10px;
  background-color: white;
  .quill-editor {
    height: 600px;
    overflow-y: auto;
  }
}
</style>