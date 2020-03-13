import Vue from 'vue'
import { VueEditor, Quill } from 'vue2-editor'
// import { ImageDrop } from 'quill-image-drop-module';
import ImageResize from 'quill-image-resize-module';
// import VideoResize from 'quill-video-resize-module2';

// import Delta from 'quill-delta';

// const BlockEmbed = Quill.import('blots/block/embed');
// const Link = Quill.import('formats/link');
// const Block = Quill.import('blots/block');
// const Inline = Quill.import('blots/inline');
// const Container = Quill.import('blots/container');




// // tslint:disable-next-line:max-classes-per-file
// class CodeBlock1 extends Block {
//   public static create (value) {
//     const domNode = super.create(value);
//     domNode.setAttribute('spellcheck', false);
//     return domNode;
//   }

//   public static formats () {
//     return true;
//   }

//   // public delta () {
//   //   // @ts-ignore
//   //   let text = this.domNode.textContent;
//   //   if (text.endsWith('\n')) {      // Should always be true
//   //     text = text.slice(0, -1);
//   //   }

//   //   return text.split('\n').reduce((delta, frag) => {
//   //     // @ts-ignore
//   //     return delta.insert(frag).insert('\n', this.formats());
//   //   }, new Delta());
//   // }
// }


// // @ts-ignore
// CodeBlock1.blotName = 'code-block';
// // @ts-ignore
// // CodeBlock1.className = 'ql-syntax';
// // @ts-ignore
// CodeBlock1.tagName = 'PRE';
// // @ts-ignore
// CodeBlock1.TAB = '  ';


// Quill.register(VideoResponsive, true)
// Quill.register(CodeBlock1)
Quill.register('modules/imageResize', ImageResize)
// Quill.register('modules/imageDrop', ImageDrop);
// Quill.register('modules/videoResize', VideoResize);

Vue.component('vue-editor', VueEditor)


