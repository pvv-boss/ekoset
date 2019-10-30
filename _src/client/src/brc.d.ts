import BrcDialogOptions from '@/plugins/brc-dialog/BrcDialogOptions'
import BrcDialogModule from '@/plugins/brc-dialog/BrcDialogModule'
// import { getServiceContainer, ServiceContainer } from '@/api/ServiceContainer'

declare module 'vue/types/vue' {
  interface Vue {
    $BrcDialog: BrcDialog;
    $BrcAlert: BrcAlert;
    $BrcNotification: BrcNotification;
    $BrcPreloader: BrcPreloader;
    $BrcDestroy: BrcDestroy;
    $ShowPreloader: ShowPreloader;
    $ClosePreloader: ClosePreloader;
    //  $getServiceContainer: getServiceContainer;
  }
}

export interface BrcDialog {
  (options: BrcDialogOptions): string
}
export interface BrcAlert {
  (type: string, content: string, title?: string, okCallback?: VoidFunction, options?: BrcDialogOptions): string
}
export interface BrcNotification {
  (type: string, title: string, content?: string, closeDelay?: number, options?: BrcDialogOptions): string
}

export interface BrcPreloader {
  (modal?: boolean, text?: string, parentId?: string, options?: BrcDialogOptions): string
}

export interface BrcDestroy {
  (id: string): void
}

export interface ShowPreloader {
  (modal?: boolean, text?: string, parentId?: string): void
}

export interface ClosePreloader {
  (): void
}

// export interface getServiceContainer {
//   (): ServiceContainer
// }
