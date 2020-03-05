import Vue from 'vue'
import { VueEditor, Quill } from 'vue2-editor'
// import { ImageDrop } from 'quill-image-drop-module';
import ImageResize from 'quill-image-resize-module';
// import VideoResize from 'quill-video-resize-module2';

const BlockEmbed = Quill.import('blots/block/embed');
const Link = Quill.import('formats/link');

class VideoResponsive extends BlockEmbed {

  public static VIDEO_ATTRIBUTES = ['height', 'width'];

  public static blotName = 'video';
  public static tagName = 'div';

  public static create (value) {
    const node = super.create(value);
    node.classList.add('ql-video-wrapper');

    const child = document.createElement('iframe');
    child.classList.add('ql-video-inner');
    child.setAttribute('frameborder', '0');
    child.setAttribute('allowfullscreen', 'true');
    child.setAttribute('src', this.sanitize(value));
    node.appendChild(child);

    return node;
  }

  public static sanitize (url) {
    return Link.sanitize(url);
  }

  public static value (domNode) {
    const iframe = domNode.querySelector('iframe');
    if (!!iframe) {
      return iframe.getAttribute('src');
    }
  }

  public static formats (domNode) {
    const iframe = domNode.getElementsByTagName('iframe')[0]
    return VideoResponsive.VIDEO_ATTRIBUTES.reduce((formats, attribute) => {
      if (iframe.hasAttribute(attribute)) {
        formats[attribute] = iframe.getAttribute(attribute)
      }
      return formats
    }, {})
  }

  public format (name, value) {
    // tslint:disable-next-line:no-console
    console.log(name)
    if (VideoResponsive.VIDEO_ATTRIBUTES.indexOf(name) > -1) {
      // @ts-ignore
      if (value) { this.domNode.setAttribute(name, value) } else { this.domNode.removeAttribute(name) }
    } else { super.format(name, value) }
  }
};

// BEGIN allow image alignment styles
const ImageFormatAttributesList = [
  'alt',
  'height',
  'width',
  'style'
];

// const BaseImageFormat = Quill.import('formats/image');
// class ImageFormat extends BaseImageFormat {
//   public static formats (domNode) {
//     return ImageFormatAttributesList.reduce((formats, attribute) => {
//       if (domNode.hasAttribute(attribute)) {
//         formats[attribute] = domNode.getAttribute(attribute);
//       }
//       return formats;
//     }, {});
//   }
//   public format (name, value) {
//     if (ImageFormatAttributesList.indexOf(name) > -1) {
//       if (value) {
//         // @ts-ignore
//         this.domNode.setAttribute(name, value);
//       } else {
//         // @ts-ignore
//         this.domNode.removeAttribute(name);
//       }
//     } else {
//       super.format(name, value);
//     }
//   }
// }

// Quill.register(ImageFormat, true);
// END allow image alignment styles
Quill.register(VideoResponsive, true)
Quill.register('modules/imageResize', ImageResize);
// Quill.register('modules/imageDrop', ImageDrop);
// Quill.register('modules/videoResize', VideoResize);

Vue.component('vue-editor', VueEditor)



