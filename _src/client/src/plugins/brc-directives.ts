import Vue from 'vue'
import brcDialogPropover from './brc-dialog/brc-dialog-propover'

brcDialogPropover.installPopoverDirective()

Vue.directive('click-outside', {
  inserted (el, binding, vnode) {
    const vm = vnode.context;
    const callback = binding.value;
    const onClickHandler = (e) => {
      if ((e.target as HTMLElement).id !== 'dont_outside') {
        if (!el.contains(e.target as HTMLElement) && !el.contains(e.target as HTMLElement)) {
          e.stopPropagation();
          callback.call(vm, event);
        }
      }
    }
    document.body.addEventListener('click', onClickHandler)
    //    document.body.addEventListener('touchstart', onClickHandler);
  }
})
