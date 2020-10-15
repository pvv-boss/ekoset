import { BrcDialogPosition } from '@/plugins/brc-dialog/BrcDialogPosition.ts'
import BrcDialogOptions from '@/plugins/brc-dialog/BrcDialogOptions.ts'

export default class BrcDialogModule {
  public createDialog(dialogOptions: BrcDialogOptions) {
    const dialogWrapper = document.createElement('div')
    const dialogWrapperId = `dialog-wrapper-${(Math.floor((Math.random() * 25)) + 10).toString(36)}${(new Date()).getTime()}-${(new Date()).getMilliseconds()}`
    dialogWrapper.style.visibility = 'hidden'
    dialogWrapper.setAttribute('id', dialogWrapperId)
    dialogWrapper.setAttribute('class', `brc-dialog-wrapper ${dialogOptions.parentElementId ? 'brc-dialog-wrapper_parental' : ''} ${dialogOptions.dialogClass && dialogOptions.dialogClass.includes('brc-preloader') ? 'brc-dialog-wrapper_preloader' : ''}`)

    if (!dialogOptions) {
      dialogOptions = new BrcDialogOptions()
    }

    const dialogId = `dialog-${(Math.floor((Math.random() * 25)) + 10).toString(36)}${(new Date()).getTime()}-${(new Date()).getMilliseconds()}`
    const template = `
                <div id='${dialogId}' class='brc-dialog ${dialogOptions.dialogClass !== '' ? dialogOptions.dialogClass : ''}'>
                    ${dialogOptions.headerVisibility ? `
                        <div class='brc-dialog__header'>
                            ${dialogOptions.headerPreIcon !== '' ? `<div class='brc-dialog__icon'><i class='${dialogOptions.headerPreIcon}'></i></div>` : ''}
                            <div class='brc-dialog__title ${dialogOptions.titleClass !== '' ? dialogOptions.titleClass : ''}'>${dialogOptions.title}</div>
                            ${dialogOptions.headerMinimizeButtonVisibility ? `<div class='brc-dialog__header-minimize' title='Свернуть'><i class='${dialogOptions.headerMinimizeButtonClass}'></i></div>` : ''}
                            ${dialogOptions.headerMaximizeButtonVisibility ? `
                                <div class='brc-dialog__header-maximize' title='Развернуть'><i class='${dialogOptions.headerMaximizeButtonClass}'></i></div>
                                <div class='brc-dialog__header-restore' title='Исходный размер'><i class='${dialogOptions.headerRestoreButtonClass}'></i></div>
                            ` : ''}
                            ${dialogOptions.headerCloseButtonVisibility ? `<div class='brc-dialog__header-close' title='Закрыть'><i class='${dialogOptions.headerCloseButtonClass}'></i></div>` : ''}
                        </div>
                    ` : ''}

                    ${dialogOptions.bodyVisibility && dialogOptions.content ? `
                        <div class='brc-dialog__body'>
                          ${dialogOptions.content}
                        </div>
                    ` : ''}

                    ${dialogOptions.footerVisibility ? `
                        <div class='brc-dialog__footer'>
                            ${dialogOptions.footerOkButtonVisibility ? `<button class='brc-dialog__button-ok ${dialogOptions.footerOkButtonClass !== '' ? dialogOptions.footerOkButtonClass : ''}'>${dialogOptions.footerOkButtonCaption}</button>` : ''}
                            ${dialogOptions.footerCancelButtonVisibility ? `<button class='brc-dialog__button-cancel ${dialogOptions.footerCancelButtonClass !== '' ? dialogOptions.footerCancelButtonClass : ''}'>${dialogOptions.footerCancelButtonCaption}</button>` : ''}
                        </div>
                    ` : ''}
                </div>`

    dialogWrapper.innerHTML = template
    if (dialogOptions.parentElementId) {
      const parent = document.getElementById(dialogOptions.parentElementId)
      if (parent !== null) {
        parent.appendChild(dialogWrapper)
      } else {
        document.body.appendChild(dialogWrapper)
      }
    } else {
      document.body.appendChild(dialogWrapper)
    }

    const dialog: HTMLDivElement = document.getElementById(dialogId) as HTMLDivElement

    // режим
    if (!dialogOptions.modal) {
      dialogWrapper.classList.add('brc-dialog-wrapper_modal')
    }

    // размеры
    if (dialogOptions.height && dialogOptions.height > 0) {
      dialog.style.height = dialogOptions.height + 'px'
    }
    if (dialogOptions.width && dialogOptions.width > 0) {
      dialog.style.width = (dialogOptions.width < document.body.clientWidth ? dialogOptions.width : (document.body.clientWidth - 20)) + 'px'
    }
    if (dialogOptions.maxHeight && dialogOptions.maxHeight > 0) {
      dialog.style.maxHeight = document.body.clientHeight * dialogOptions.maxHeight + 'px'
    }
    if (dialogOptions.maxWidth && dialogOptions.maxWidth > 0) {
      dialog.style.maxWidth = document.body.clientWidth * dialogOptions.maxWidth + 'px'
    }
    if (dialogOptions.fullScreenDefault) {
      dialog.classList.add('brc-dialog_maximize')
    } else {
      dialog.classList.add('brc-dialog_normal')
    }

    // позиционирование
    if (dialogOptions.position && dialogOptions.position !== BrcDialogPosition.Central) {
      const position = dialogOptions.position.split('-')
      dialog.classList.add('brc-dialog_normal-' + position[0])
      dialog.classList.add('brc-dialog_normal-' + position[1])
    } else {
      dialog.classList.add('brc-dialog_normal-central')
    }

    dialogWrapper.style.visibility = 'visible'

    // задержка закрытия
    if (dialogOptions.closeDelay && dialogOptions.closeDelay > 0) {
      const timer = setTimeout(this.closeDialog, dialogOptions.closeDelay, dialogWrapperId, dialogOptions.cancelCallback)
    }

    // закрытие по Escape и Leave
    if (dialogOptions.closeOnEscape) {
      document.addEventListener('keyup', (e) => {
        if (e.keyCode === 27) {
          this.closeDialog(dialogWrapperId, dialogOptions.cancelCallback)
        }
      })
    }
    if (dialogOptions.closeOnLeave) {
      dialogWrapper.addEventListener('click', (e) => {
        if (!dialog.contains(e.target as HTMLElement)) { // и не по его дочерним элементам
          this.closeDialog(dialogWrapperId, dialogOptions.cancelCallback)
        }
      })
    }

    // изменение размера
    if (dialogOptions.resizable) {
      dialog.style.resize = 'both'
      dialog.style.overflow = 'hidden'
    }
    // перетаскивание
    if (dialogOptions.dragable) {
      let dragableTitle: HTMLElement | null
      const dragableTitleElement = dialog.getElementsByClassName('brc-dialog__title')
      dragableTitle = dragableTitleElement && dragableTitleElement.length && dragableTitleElement.length > 0 ? dragableTitle = dragableTitleElement[0] as HTMLElement : null
      if (dragableTitle != null) {
        dragableTitle.style.cursor = 'pointer'
        dragableTitle.addEventListener('mousedown', (e) => {
          dialog.style.position = 'absolute'
          dialog.style.transform = 'none'
          dialog.style.margin = 'none'
          moveAt(e)
          function moveAt(e) {
            dialog.style.left = e.pageX - dialog.offsetWidth / 2 + 'px'
            dialog.style.top = e.pageY - 10 + 'px' // e.pageY - dialog.offsetHeight / 2 + 'px'
          }
          document.onmousemove = (e) => {
            moveAt(e)
          }
          dialogWrapper.onmouseup = () => {
            document.onmousemove = null
            dialog.onmouseup = null
          }
        })
      }
    }

    // события
    if (dialogOptions.headerVisibility) {
      if (dialogOptions.headerMinimizeButtonVisibility) {
        dialog.getElementsByClassName('brc-dialog__header-minimize')[0].addEventListener('click', () => {
          dialog.classList.add('brc-dialog_minimize')
          if (dialog.classList.contains('brc-dialog_maximize')) {
            dialog.classList.remove('brc-dialog_maximize')
          }
          if (dialog.classList.contains('brc-dialog_normal')) {
            dialog.classList.remove('brc-dialog_normal')
          }
        })
      }
      if (dialogOptions.headerMaximizeButtonVisibility) {
        dialog.getElementsByClassName('brc-dialog__header-maximize')[0].addEventListener('click', () => {
          dialog.classList.add('brc-dialog_maximize')
          if (dialog.classList.contains('brc-dialog_minimize')) {
            dialog.classList.remove('brc-dialog_minimize')
          }
          if (dialog.classList.contains('brc-dialog_normal')) {
            dialog.classList.remove('brc-dialog_normal')
          }
        })
        dialog.getElementsByClassName('brc-dialog__header-restore')[0].addEventListener('click', () => {
          dialog.classList.add('brc-dialog_normal')
          dialog.classList.remove('brc-dialog_maximize')
          if (dialog.classList.contains('brc-dialog_minimize')) {
            dialog.classList.remove('brc-dialog_minimize')
          }
        })
      }
      if (dialogOptions.headerCloseButtonVisibility) {
        dialog.getElementsByClassName('brc-dialog__header-close')[0].addEventListener('click', () => {
          this.closeDialog(dialogWrapperId, dialogOptions.cancelCallback)
        })
      }
    }
    if (dialogOptions.footerVisibility && dialogOptions.footerCancelButtonVisibility) {
      dialog.getElementsByClassName('brc-dialog__button-cancel')[0].addEventListener('click', () => {
        this.closeDialog(dialogWrapperId, dialogOptions.cancelCallback)
      })
    }
    if (dialogOptions.footerVisibility && dialogOptions.footerOkButtonVisibility) {
      dialog.getElementsByClassName('brc-dialog__button-ok')[0].addEventListener('click', () => {
        this.closeDialog(dialogWrapperId, dialogOptions.okCallback)
      })
    }
    return dialog
  }

  private closeDialog(dialogWrapperId, callback?) {
    if (callback && typeof callback === 'function') {
      callback()
    }
    const dWrapper = document.getElementById(dialogWrapperId)
    if (dWrapper) {
      dWrapper.classList.add('brc-dialog_hidden')
      dWrapper.remove()
    }
  }
}
