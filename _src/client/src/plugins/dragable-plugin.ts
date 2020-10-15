import Vue from 'vue'

// import Draggable from 'vuedraggable'
const Draggable = () => import(/* webpackChunkName: "vuedraggable" */ /* webpackPrefetch: true */ 'vuedraggable')

Vue.component('draggable', Draggable)
