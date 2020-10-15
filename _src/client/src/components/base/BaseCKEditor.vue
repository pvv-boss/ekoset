<template>
  <client-only>
    <div class="brc-text-editor_simple">
      <ckeditor
        :id="id"
        :class="editorClass"
        :editor="editor"
        :config="editorConfig"
        :value="editorContent"
        @input="onEditorInput"
      ></ckeditor>
    </div>
  </client-only>
</template>

<script lang="ts">

import { Component, Vue, Watch, Prop } from 'nuxt-property-decorator'
import CkEditor from '@ckeditor/ckeditor5-vue'
import Editor from 'rsn/ckeditor'
// const Editor = () => import(/* webpackChunkName: "rsn-ckeditor5" */ 'rsn/ckeditor')

// let CkEditor
// let Editor

// const CkEditor = () => import(/* webpackChunkName: "rsn-ckeditor5" */ '@ckeditor/ckeditor5-vue')

if (process.client) {
  // tslint:disable-next-line:no-var-requires
  // CkEditor = () => import(/* webpackChunkName: "rsn-ckeditor5" */ '@ckeditor/ckeditor5-vue')
  // tslint:disable-next-line:no-var-requires
  // Editor = () => import(/* webpackChunkName: "rsn-ckeditor5" */ 'rsn/ckeditor')

  // console.log(CkEditor.component)
} else {
  // CkEditor = { component: { template: '<div></div>' } }
}

@Component({
  components: {
    ckeditor: CkEditor.component
  }
})
export default class BaseCkEditor extends Vue {
  @Prop()
  private value

  @Prop()
  private id

  @Prop()
  private editorClass

  private editorContent = null

  private editor = null

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
        //    'subscript',
        //    'superscript',
        '|',
        'numberedList',
        'bulletedList',
        'todoList',
        '|',
        'indent',
        'outdent',
        '|',
        'link',
        'blockQuote',
        'insertTable',
        'imageUpload',
        'mediaEmbed',
        'horizontalLine',
        '|',
        'undo',
        'redo'
      ]
    },

    language: 'ru',

    image: {
      toolbar: [
        // 'imageTextAlternative',
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

  @Watch('value', { immediate: true })
  private valueChanged () {
    this.editorContent = this.value
  }

  private onEditorInput (val) {
    this.editorContent = val
    this.$emit('input', this.editorContent)
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