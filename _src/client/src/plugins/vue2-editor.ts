import Vue from 'vue'
import { VueEditor, Quill } from 'vue2-editor'
import { ImageDrop } from 'quill-image-drop-module';
import ImageResize from 'quill-image-resize-module';
import VideoResize from 'quill-video-resize-module2';

const BlockEmbed = Quill.import('blots/block/embed');
const Link = Quill.import('formats/link');

class VideoResponsive extends BlockEmbed {

  public static blotName = 'video';
  public static tagName = 'div';

  public static create (value) {
    const node = super.create(value);
    node.classList.add('ql-video-wrapper');

    const innerChild = document.createElement('div');
    innerChild.classList.add('ql-video-inner');
    node.appendChild(innerChild);

    const child = document.createElement('iframe');
    child.setAttribute('frameborder', '0');
    child.setAttribute('allowfullscreen', 'true');
    child.setAttribute('src', this.sanitize(value));
    innerChild.appendChild(child);

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
};

Quill.register(VideoResponsive)
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/videoResize', VideoResize);

Vue.component('vue-editor', VueEditor)



