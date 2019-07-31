import Vue from 'vue'
import VueQuillEditor, { Quill } from 'vue-quill-editor'
import ImageResize from 'quill-image-resize-module'
import { ImageFormat } from '@/models/ImageFormat.ts'

Quill.register('modules/imageResize', ImageResize)

Quill.register(ImageFormat, true);
Vue.use(VueQuillEditor)


