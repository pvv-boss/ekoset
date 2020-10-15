import Vue from 'vue'
import { BrcPopoverPosition } from './BrcDialogPosition'
import BrcDialogOptions from './BrcDialogOptions'
import BrcDialogModule from './BrcDialogModule'

class BrcDialogPropover {
  private dialog = new BrcDialogModule()

  public installPopoverDirective() {
    const propoverOptions = new BrcDialogOptions()
    propoverOptions.resizable = false
    propoverOptions.dragable = false
    propoverOptions.headerCloseButtonVisibility = false
    propoverOptions.headerMinimizeButtonVisibility = false
    propoverOptions.headerMaximizeButtonVisibility = false
    propoverOptions.footerVisibility = false
    propoverOptions.modal = false
    propoverOptions.dialogClass = `brc-popover`

    Vue.directive('brc-popover', {
      inserted: (el, binding) => {
        let hasPopover = false
        let popover: HTMLElement
        binding.value.event = binding.value.event ? binding.value.event : 'mouseover'

        el.addEventListener(binding.value.event, (e) => {
          if (!hasPopover) {
            hasPopover = true
            popover = showPopover(binding.value.text, binding.value.title, el, binding.value.position)

            if (binding.value.event === 'mouseover') {
              document.addEventListener('mouseover', (e) => {
                if (hasPopover) {
                  if (!el.contains(e.target as HTMLElement) && !popover.contains(e.target as HTMLElement)) { // и не по его дочерним элементам
                    popover.parentElement ? popover.parentElement.remove() : popover.remove()
                    hasPopover = false
                  }
                }
              })
            }
          } else if (binding.value.event === 'click') {
            popover.parentElement ? popover.parentElement.remove() : popover.remove()
            hasPopover = false
          }
        })
        document.addEventListener('click', (e) => {
          if (hasPopover) {
            if (!el.contains(e.target as HTMLElement) && !popover.contains(e.target as HTMLElement)) { // и не по его дочерним элементам
              popover.parentElement ? popover.parentElement.remove() : popover.remove()
              hasPopover = false
            }
          }
        })
      }
    })

    const showPopover = (content: string, title = '', el: HTMLElement, position: BrcPopoverPosition = BrcPopoverPosition.Bottom) => {
      propoverOptions.headerVisibility = title !== ''
      propoverOptions.closeOnLeave = false
      propoverOptions.title = title
      propoverOptions.content = content

      const htmlDialog = this.dialog.createDialog(propoverOptions)

      const elWidth = el.getBoundingClientRect().width
      const elHeight = el.getBoundingClientRect().height
      const elTop = el.getBoundingClientRect().top
      const elLeft = el.getBoundingClientRect().left
      const dialogWidth = htmlDialog.getBoundingClientRect().width
      const dialogHeight = htmlDialog.getBoundingClientRect().height

      const bodyWidth = document.body.clientWidth
      const bodyHeight = document.body.clientHeight
      let dialogTop = 0
      let dialogLeft = 0

      switch (position) {
        case BrcPopoverPosition.Right: {
          dialogLeft = elLeft + elWidth
          dialogTop = elTop + elHeight / 2 - dialogHeight / 2
          break
        }
        case BrcPopoverPosition.Left: {
          dialogLeft = elLeft - dialogWidth
          dialogTop = elTop + elHeight / 2 - dialogHeight / 2
          break
        }
        case BrcPopoverPosition.Top: {
          dialogLeft = elLeft + elWidth / 2 - dialogWidth / 2
          dialogTop = elTop - dialogHeight
          break
        }
        case BrcPopoverPosition.Bottom: {
          dialogLeft = elLeft + elWidth / 2 - dialogWidth / 2
          dialogTop = elTop + elHeight
          break
        }
      }
      if (dialogLeft + dialogWidth > bodyWidth) {
        dialogLeft = bodyWidth - dialogWidth
        dialogTop = elTop - dialogHeight
      } else if (dialogLeft < 0) {
        dialogLeft = 3
        dialogTop = elTop - dialogHeight
      }
      if (dialogTop + dialogHeight > bodyHeight) {
        dialogTop = bodyHeight - dialogHeight
      } else if (dialogTop < 0) {
        dialogTop = 0
      }
      htmlDialog.style.left = `${dialogLeft}px`
      htmlDialog.style.top = `${dialogTop}px`
      htmlDialog.style.visibility = 'visible'
      return htmlDialog
    }
  }
}

const brcDialogPropover = new BrcDialogPropover()
export default brcDialogPropover
