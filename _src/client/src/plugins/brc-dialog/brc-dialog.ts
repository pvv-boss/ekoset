import Vue from 'vue'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType.ts'
import { BrcDialogPosition, BrcPopoverPosition } from '@/plugins/brc-dialog/BrcDialogPosition.ts'
import BrcDialogOptions from '@/plugins/brc-dialog/BrcDialogOptions.ts'
import BrcDialogModule from '@/plugins/brc-dialog/BrcDialogModule.ts'

class BrcDialogPlugin {
  private defaultDialogOptions = new BrcDialogOptions()
  private dialog = new BrcDialogModule()

  public install (vue, options) {
    this.defaultDialogOptions.position = BrcDialogPosition.RightBottom
    this.defaultDialogOptions.headerMinimizeButtonVisibility = false
    this.defaultDialogOptions.headerMaximizeButtonVisibility = false
    this.defaultDialogOptions.resizable = false
    this.defaultDialogOptions.dragable = false

    this.installDialog()
  }

  public showNotify (type: BrcDialogType = BrcDialogType.Info, title: string, content: string = '', closeDelay: number = 4000, options?: BrcDialogOptions) {
    let preHeaderIcon = ''
    switch (type) {
      case BrcDialogType.Error: preHeaderIcon = 'fas fa-times-circle text-danger'; break
      case BrcDialogType.Warning: preHeaderIcon = 'fas fa-exclamation-triangle text-warning'; break
      case BrcDialogType.Success: preHeaderIcon = 'fas fa-check text-success'; break
    }

    const mergedOptions = { ...this.defaultDialogOptions, ...options }
    mergedOptions.headerPreIcon = preHeaderIcon
    mergedOptions.footerVisibility = false
    mergedOptions.modal = false
    mergedOptions.closeOnLeave = false
    mergedOptions.closeOnEscape = false
    mergedOptions.width = 300
    mergedOptions.title = title
    mergedOptions.content = content
    mergedOptions.closeDelay = closeDelay
    mergedOptions.dialogClass = `brc-notification brc-notification_${type} ${title === '' && type === BrcDialogType.Info ? 'brc-notification_without-title' : ''}`

    return this.getDialogId(this.dialog.createDialog(mergedOptions))
  }

  public showAlert (type: BrcDialogType = BrcDialogType.Info, content: string, title: string = '', okCallback?: VoidFunction, options?: BrcDialogOptions) {
    const mergedOptions = { ...this.defaultDialogOptions, ...options }
    mergedOptions.position = BrcDialogPosition.Central
    mergedOptions.modal = true
    mergedOptions.closeOnLeave = false
    mergedOptions.closeOnEscape = true
    mergedOptions.width = 500
    mergedOptions.dialogClass = `brc-alert brc-alert_${type}`
    mergedOptions.title = title
    mergedOptions.content = content
    mergedOptions.okCallback = okCallback

    return this.getDialogId(this.dialog.createDialog(mergedOptions))
  }

  public showInfoAlert (title: string, content: string) {
    return this.showAlert(BrcDialogType.Info, content, title, undefined, { footerCancelButtonVisibility: false, headerCloseButtonVisibility: false })
  }

  private getDialogId (dialog: HTMLDivElement) {
    if (!!dialog) {
      if (dialog.parentElement) {
        return dialog.parentElement.getAttribute('id')
      }
      return dialog.getAttribute('id')
    }
  }

  private installDialog () {
    Vue.prototype.$BrcDialog = (options: BrcDialogOptions) => {
      options = { ...this.defaultDialogOptions, ...options }
      const dialog = new BrcDialogModule()
      return dialog.createDialog(options)
    }

    Vue.prototype.$BrcAlert = (type: BrcDialogType = BrcDialogType.Info, content: string, title: string = '', okCallback?: VoidFunction, options?: BrcDialogOptions) => {
      return this.showAlert(type, content, title, okCallback, options)
    }

    Vue.prototype.$BrcNotification = (type: BrcDialogType = BrcDialogType.Info, title: string, content: string = '', closeDelay: number = 2000, options?: BrcDialogOptions) => {
      return this.showNotify(type, title, content, closeDelay, options)
    }

    Vue.prototype.$BrcPreloader = (modal: boolean = false, text?: string, parentId?: string, options?: BrcDialogOptions) => {
      const mergedOptions = { ...this.defaultDialogOptions, ...options }
      mergedOptions.position = BrcDialogPosition.Central
      mergedOptions.footerVisibility = false
      mergedOptions.headerVisibility = false
      mergedOptions.parentElementId = parentId || ''
      mergedOptions.modal = modal
      mergedOptions.closeOnLeave = false
      mergedOptions.closeOnEscape = false
      mergedOptions.dialogClass = `brc-preloader ${text ? 'brc-preloader_caption' : ''}`
      mergedOptions.content = `<div style="width:16px; height:16px;margin:auto;background-image: url('data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==')"></div>
                                ${text ? `<div class="brc-preloader__caption">${text}</div>` : ''}`
      const dialog = this.dialog.createDialog(mergedOptions)
      if (dialog.parentElement) {
        return dialog.parentElement.getAttribute('id')
      }
      return dialog.getAttribute('id')
    }

    Vue.prototype.$BrcDestroy = (id: string) => {
      if (id) {
        const wrapper = document.getElementById(id)
        if (wrapper) {
          wrapper.remove()
        }
      }
    }
  }
}

const plugin = new BrcDialogPlugin()
export default plugin
