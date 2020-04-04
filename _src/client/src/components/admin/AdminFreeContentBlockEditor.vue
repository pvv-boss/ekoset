<template>
  <div class="brc-text-editor_simple">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >B</button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >I</button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >Strike</button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >Underline</button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >Code</button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >paragraph</button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >H1</button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >H2</button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >H3</button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >UL</button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >OL</button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >&quot;&quot;</button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >Code</button>

        <button class="menubar__button" @click="commands.horizontal_rule">HR</button>
        <button class="menubar__button" @click="commands.undo">Undo</button>
        <button class="menubar__button" @click="commands.redo">Redo</button>
      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image
} from 'tiptap-extensions'

@Component({
  components: {
    EditorContent,
    EditorMenuBar
  }
})
export default class AdminFreeContentBlockEditor extends Vue {
  @Prop()
  private value

  @Prop()
  private id

  private editor: Editor = null
  private emitAfterOnUpdate = false

  private mounted () {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3, 4] }),
        new HorizontalRule(),
        new ListItem(),
        new OrderedList(),
        new BulletList(),
        new ListItem(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
        new Image()
      ],
      onUpdate: ({ getHTML }) => {
        this.emitAfterOnUpdate = true;
        this.$emit('input', getHTML())
      }
    })

    // tslint:disable-next-line:no-console
    console.log(this.value)
    this.editor.setContent(this.value)
  }

  @Watch('value')
  private updateContent (val) {
    if (this.emitAfterOnUpdate) {
      this.emitAfterOnUpdate = false
      return
    }
    if (this.editor) {
      this.editor.setContent(val)
    }
  }

  private beforeDestroy () {
    if (this.editor) {
      this.editor.destroy()
    }
  }

}
</script>


<style lang="scss">
@import '@/styles/variables.scss';
</style>