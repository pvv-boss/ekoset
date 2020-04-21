<template>
  <client-only>
    <div>
      <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    </div>
  </client-only>
</template>

<script lang="ts">

let CKEditor
let Editor

import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { NuxtContext } from 'vue/types/options'

if (process.client) {
  // tslint:disable-next-line:no-var-requires
  CKEditor = require('@ckeditor/ckeditor5-vue')
  // tslint:disable-next-line:no-var-requires
  Editor = require('rsn/ckeditor')
} else {
  CKEditor = { component: { template: '<div></div>' } }
}

@Component({
  components: {
    ckeditor: CKEditor.component
  }
})
export default class Test extends Vue {

  private editor = null
  private editorData = '<p>Content of the editor.</p>'
  private editorConfig = {

    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'underline',
        'fontColor',
        'fontBackgroundColor',
        'alignment',
        '|',
        'numberedList',
        'bulletedList',
        'todoList',
        '|',
        'indent',
        'outdent',
        '|',
        'link',
        'horizontalLine',
        'blockQuote',
        'insertTable',
        '|',
        'imageUpload',
        'mediaEmbed',
        // 'CKFinder',
        '|',
        'fontSize',
        'strikethrough',
        'subscript',
        'superscript',
        '|',
        'undo',
        'redo'
      ]
    },
    language: 'ru',
    image: {
      toolbar: [
        'imageTextAlternative',
        'imageStyle:alignLeft',
        'imageStyle:full',
        // 'imageStyle:side',
        'imageStyle:alignRight'
      ],
      styles: [
        'full',
        // 'side',
        'alignLeft',
        'alignRight'
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties'
      ]
    }
  }

  private beforeMount () {
    this.editor = Editor
  }
}

</script>