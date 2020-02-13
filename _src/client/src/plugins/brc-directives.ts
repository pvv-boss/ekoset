import Vue from 'vue'
import brcDialogPropover from './brc-dialog/brc-dialog-propover'

brcDialogPropover.installPopoverDirective()

Vue.directive('click-outside', {
  inserted (el, binding, vnode) {
    const vm = vnode.context;
    const callback = binding.value;
    const onClickHandler = (e) => {
      if (!el.contains(e.target as HTMLElement) && !el.contains(e.target as HTMLElement)) {
        e.stopPropagation();
        callback.call(vm, event);
      }
    }

    // document.body.addEventListener('touchend', onClickHandler)
    document.body.addEventListener('click', onClickHandler)
  }

})


// // create variable for our handler to be shared between the bind & unbind hooks
// var handleOutsideClick={}
// const OutsideClick = {
//   // this directive is run on the bind and unbind hooks
//   bind (el, binding, vnode) {
//     // Define the function to be called on click, filter the excludes and call the handler
//     handleOutsideClick[el.id] = e => {
//       e.stopPropagation()
//       // extract the handler and exclude from the binding value
//       const { handler, exclude } = binding.value
//       // set variable to keep track of if the clicked element is in the exclude list
//       let clickedOnExcludedEl = false
//       // if the target element has no classes, it won't be in the exclude list skip the check
//       if (e.target._prevClass !== undefined) {
//         // for each exclude name check if it matches any of the target element's classes
//         for (const className of exclude) {
//           clickedOnExcludedEl = e.target._prevClass.includes(className)
//           if (clickedOnExcludedEl) {
//             break // once we have found one match, stop looking
//           }
//         }
//       }
//       // don't call the handler if our directive element contains the target element
//       // or if the element was in the exclude list
//       if (!(el.contains(e.target) || clickedOnExcludedEl)) {
//         handler()
//       }
//     }
//     // Register our outsideClick handler on the click/touchstart listeners
//     document.addEventListener('click', handleOutsideClick[el.id])
//     document.addEventListener('touchstart', handleOutsideClick[el.id])
//     document.onkeydown = e => {
//       //this is an option but may not work right with multiple handlers
//       if (e.keyCode === 27) {
//         // TODO: there are minor issues when escape is clicked right after open keeping the old target
//         handleOutsideClick[el.id](e)
//       }
//     }
//   },
//   unbind () {
//     // If the element that has v-outside-click is removed, unbind it from listeners
//     document.removeEventListener('click', handleOutsideClick[el.id])
//     document.removeEventListener('touchstart', handleOutsideClick[el.id])
//     document.onkeydown = null //Note that this may not work with multiple listeners
//   }
// }
// export default OutsideClick