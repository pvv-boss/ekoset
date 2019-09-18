import Vue from 'vue'
import VueQuillEditor, { Quill } from 'vue-quill-editor'
import ImageResize from 'quill-image-resize-module'
import { ImageFormat } from '@/models/ImageFormat.ts'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Quill.register('modules/imageResize', ImageResize)
Quill.register(ImageFormat, true)

Vue.use(VueQuillEditor)


