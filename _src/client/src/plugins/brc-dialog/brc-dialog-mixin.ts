
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class DialogMixin extends Vue {
  private preloaderId = ''

  public showPreloader(modal?: boolean, text?: string, parentId?: string) {
    this.preloaderId = this.$BrcPreloader(modal, text, parentId)
  }

  public closePreloader() {
    this.$BrcDestroy(this.preloaderId)
    this.preloaderId = ''
  }

  public beforeDestroy() {
    if (this.preloaderId && this.preloaderId !== '') {
      this.closePreloader()
    }
  }
}
