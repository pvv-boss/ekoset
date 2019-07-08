<template>
  <section class="brc-body">
    <div class="container">
      <!-- <no-ssr>
        <quill-editor v-model="content" ref="textEditor" :options="editorOption"></quill-editor>
      </no-ssr>-->
      <div
        class="quill-editor"
        :content="content"
        @change="onEditorChange($event)"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        v-quill:myQuillEditor="editorOptions"
      ></div>
      <div>
        <button @click="saveText">Сохранить</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class ArticleEditor extends Vue {
  private content = ''

  private toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean'],
    ['link', 'image', 'video']
  ]
  private editorOptions = {
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

  private cleanHandler () {

    const str = this.content
    alert(str)
    this.content = str.replace(/\s*(style|class)=\".*?\"/gm, '')
    alert(this.content)
  }

  private onEditorBlur (editor) {
    // console.log('editor blur!', editor)
  }
  private onEditorFocus (editor) {
    // console.log('editor focus!', editor)
  }
  private onEditorReady (editor) {
    // console.log('editor ready!', editor)
  }
  private onEditorChange ({ editor, html, text }) {
    //alert('change')
    // console.log('editor change!', editor, html, text)
    this.content = html
  }

  private saveText () {
    this.setContent(this.content)
    alert('Сохранили')
  }

  private mounted () {
    this.getContent()
  }

  private setContent (value) {
    value = encodeURIComponent(value);
    localStorage.setItem('testObject', value);
  }

  private getContent () {
    const content = localStorage.getItem('testObject')
    this.content = decodeURIComponent(content !== null ? content : '')
  }


}
</script>
<style lang="scss" scoped>
.container {
  width: 60%;
  margin: 0 auto;
  padding: 50px 0;
  background-color: white;
  .quill-editor {
    min-height: 200px;
    max-height: 600px;
    overflow-y: auto;
  }
}
</style>