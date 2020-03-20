import Vue from 'vue'
import brcDialogPropover from './brc-dialog/brc-dialog-propover'

brcDialogPropover.installPopoverDirective()

Vue.directive('click-outside', {
  inserted (el, binding, vnode) {
    const vm = vnode.context;
    const callback = binding.value;
    const onClickHandler = (e) => {
      const elem = e.target as HTMLElement
      if (elem.id !== 'dont_outside' && !elem.classList.contains('dont_outside')) {
        if (!el.contains(elem) && !el.contains(elem)) {
          e.stopPropagation();
          callback.call(vm, event);
        }
      }
    }
    document.body.addEventListener('click', onClickHandler)
    //    document.body.addEventListener('touchstart', onClickHandler);
  }
})
