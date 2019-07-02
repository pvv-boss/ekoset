import { BrcDialogPosition } from '@/plugins/brc-dialog/BrcDialogPosition.ts'

export default class BrcDialogOptions {
  public resizable?: boolean
  public dragable?: boolean

  public headerVisibility?: boolean
  public headerCloseButtonVisibility?: boolean
  public headerMinimizeButtonVisibility?: boolean
  public headerMaximizeButtonVisibility?: boolean

  public headerCloseButtonClass?: string
  public headerMinimizeButtonClass?: string
  public headerMaximizeButtonClass?: string
  public headerRestoreButtonClass?: string
  public headerPreIcon?: string
  public bodyVisibility?: boolean
  public footerVisibility?: boolean
  public footerOkButtonVisibility?: boolean
  public footerCancelButtonVisibility?: boolean
  public fullScreenDefault?: boolean
  public modal?: boolean
  public parentElementId?: string
  public closeOnLeave?: boolean
  public closeOnEscape?: boolean
  public position?: BrcDialogPosition
  public title?: string
  public content?: string
  public height?: number
  public width?: number
  public maxHeight?: number
  public maxWidth?: number
  public footerOkButtonCaption?: string
  public footerCancelButtonCaption?: string
  public footerOkButtonClass?: string
  public footerCancelButtonClass?: string
  public dialogClass?: string
  public titleClass?: string
  public closeDelay?: number
  public okCallback?: VoidFunction
  public cancelCallback?: VoidFunction

  constructor() {
    this.resizable = true
    this.dragable = true
    this.headerVisibility = true
    this.headerCloseButtonVisibility = true
    this.headerMinimizeButtonVisibility = true
    this.headerMaximizeButtonVisibility = true
    this.headerCloseButtonClass = 'fas fa-times'
    this.headerMinimizeButtonClass = 'far fa-window-minimize'
    this.headerMaximizeButtonClass = 'far fa-window-maximize'
    this.headerRestoreButtonClass = 'far fa-window-restore'
    this.headerPreIcon = ''
    this.bodyVisibility = true
    this.footerVisibility = true
    this.footerOkButtonVisibility = true
    this.footerCancelButtonVisibility = true
    this.fullScreenDefault = false
    this.modal = true
    this.parentElementId = ''
    this.closeOnLeave = true
    this.closeOnEscape = true
    this.position = BrcDialogPosition.Central
    this.title = ''
    this.content = ''
    this.height = 0
    this.width = 0
    this.maxHeight = 0
    this.maxWidth = 0
    this.footerOkButtonCaption = 'OK'
    this.footerCancelButtonCaption = 'Отмена'
    this.footerOkButtonClass = ''
    this.footerCancelButtonClass = ''
    this.dialogClass = ''
    this.titleClass = ''
    this.closeDelay = 0
  }
}
