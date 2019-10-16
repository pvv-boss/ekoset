import Vue from 'vue'
import { VueEditor, Quill } from 'vue2-editor'
import BlotFormatter from 'quill-blot-formatter'

Quill.register('modules/blotFormatter', BlotFormatter);
Vue.component('vue-editor', VueEditor)


