import Vue from 'vue'
import plugin from './brc-dialog/brc-dialog'
import brcDialogPropover from './brc-dialog/brc-dialog-propover'

Vue.use(plugin)

brcDialogPropover.installPopoverDirective()
