<template>
  <div class="container" id="container">
    <quill-editor
      ref="textQuillEditor"
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
export default class AdminTextBlockEditor extends Vue {
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
    ['link', 'image', 'video'],
    ['html']
  ]
  private editorOptions = {
    theme: 'snow',
    debug: false,
    modules: {
      toolbar: {
        container: this.toolbarOptions,
        handlers: {
          clean: this.cleanHandler,
          html: this.htmlEditor
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

  private txtArea




  public get editor () {
    // @ts-ignore
    return this.$refs.textQuillEditor.quill
  }

  private cleanHandler () {
    const str = this.value
    this.value = str.replace(/\s*(style|class)=\".*?\"/gm, '')
  }

  private htmlEditor () {
    if (this.txtArea.style.display === '') {
      const html = this.txtArea.value
      this.editor.pasteHTML(html)
    }
    this.txtArea.style.display = this.txtArea.style.display === 'none' ? '' : 'none'
  }

  private onEditorChange ({ editor, html, text }) {
    this.$emit('input', html)
    this.txtArea.value = html
  }

  private mounted () {
    this.txtArea = document.createElement('textarea');
    this.txtArea.setAttribute('id', 'txtArea')
    this.txtArea.style.cssText = 'width: 100%;height:100%;margin: 0px;background: rgb(29, 29, 29);box-sizing: border-box;color: rgb(204, 204, 204);font-size: 15px;outline: none;padding: 20px;line-height: 24px;font-family: Consolas, Menlo, Monaco, &quot;Courier New&quot;, monospace;position: absolute;top: 0;bottom: 0;border: none;display:none'

    const htmlEditor = this.editor.addContainer('ql-custom')
    htmlEditor.appendChild(this.txtArea)
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
    content: "Исходный Html" !important;
  }
}
</style>