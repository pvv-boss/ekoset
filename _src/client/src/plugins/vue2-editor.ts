import Vue from 'vue'
import { VueEditor, Quill } from 'vue2-editor'
import BlotFormatter from 'quill-blot-formatter'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Quill.register('modules/blotFormatter', BlotFormatter);
Vue.component('vue-editor', VueEditor)


