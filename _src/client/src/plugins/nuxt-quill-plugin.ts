import Vue from 'vue'
import VueQuillEditor, { Quill } from 'vue-quill-editor'
import ImageResize from 'quill-image-resize-module'

Quill.register('modules/imageResize', ImageResize)

Vue.use(VueQuillEditor)
