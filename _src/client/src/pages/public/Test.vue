<template>
  <client-only>
    <div>
      <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" @input="onEditorInput"></ckeditor>
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
        'strikethrough',
        'alignment',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'fontSize',
        'subscript',
        'superscript',
        '|',
        'numberedList',
        'bulletedList',
        'todoList',
        '|',
        'outdent',
        'indent',
        '|',
        'link',
        'horizontalLine',
        'blockQuote',
        'insertTable',
        'imageUpload',
        'mediaEmbed',
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

    mediaEmbed: {
      previewsInData: true
    },

    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties'
      ],

      tableProperties: {
        borderColors: this.getColors(),
        backgroundColors: this.getColors()
      },

      tableCellProperties: {
        borderColors: this.getColors(),
        backgroundColors: this.getColors()
      }
    },

    fontColor: this.getFontColors(),
    fontBackgroundColor: this.getFontColors()

  }

  private beforeMount () {
    this.editor = Editor
  }

  private onEditorInput (val) {
    // tslint:disable-next-line:no-console
    console.log(val)
  }

  private getFontColors () {
    return {
      documentColors: 0,
      colors: this.getColors()
    }
  }

  private getColors () {
    return [
      {
        color: 'white',
        label: 'White'
      },
      {
        color: 'black',
        label: 'Black'
      },
      {
        color: 'Silver',
        label: 'Silver'
      },
      {
        color: 'Gray',
        label: 'Gray'
      },
      {
        color: 'Red',
        label: 'Red'
      },
      {
        color: 'Maroon',
        label: 'Maroon'
      },
      {
        color: 'Yellow',
        label: 'Yellow'
      },
      {
        color: 'Olive',
        label: 'Olive'
      },
      {
        color: 'Green',
        label: 'Green'
      },
      {
        color: 'Aqua',
        label: 'Aqua'
      },
      {
        color: 'Teal',
        label: 'Teal'
      },
      {
        color: 'Blue',
        label: 'Blue'
      },
      {
        color: 'Navy',
        label: 'Navy'
      },
      {
        color: 'Fuchsia',
        label: 'Fuchsia'
      },
      {
        color: 'Purple',
        label: 'Purple'
      }
    ]
  }

}

</script>